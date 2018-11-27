'use strict';

import hydrajs  from '../../common_shared/hydrajs';

export default class SecurityService {
    constructor ($rootScope, $uibModal, AUTH_EVENTS, $q, LOGIN_VIEW_CONFIG, SECURITY_CONFIG, strataService, AlertService, RHAUtils) {
        'ngInject';

        this.loginStatus = {
            isLoggedIn: false,
            verifying: false,
            userAllowedToManageCases: true,
            authedUser: {}
        };
        this.loggingIn = false;
        this.loginFailure = false;
        this.loginURL = SECURITY_CONFIG.loginURL;
        this.logoutURL = SECURITY_CONFIG.logoutURL;
        this.isSubscriptionServiceM = false;
        this.isCep = false;
        this.setLoginStatus = function(isLoggedIn, verifying, authedUser) {
            this.loginStatus.isLoggedIn = isLoggedIn;
            this.loginStatus.verifying = verifying;
            this.loginStatus.authedUser = authedUser;
            this.loginStatus.authedUser.loggedInUser = `${authedUser.first_name} ${authedUser.last_name}`;
            RHAUtils.userTimeZone=authedUser.timezone;
        };
        this.clearLoginStatus = function() {
            this.loginStatus.isLoggedIn = false;
            this.loginStatus.verifying = false;
            this.loginStatus.userAllowedToManageCases = false;
            this.loginStatus.authedUser = {};
            RHAUtils.userTimeZone='';
        };
        this.setAccount = function(accountJSON) {
            this.loginStatus.account = accountJSON;
        };
        this.modalDefaults = {
            backdrop: 'static',
            keyboard: true,
            modalFade: true,
            template: require('../views/login_form.jade'),
            windowClass: 'rha-login-modal'
        };
        this.modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?',
            backdrop: 'static'
        };
        this.userAllowedToManageCases = function() {
            var canManage = false;
            if( RHAUtils.isNotEmpty(this.loginStatus.authedUser.rights) && (this.loginStatus.authedUser.is_entitled || RHAUtils.isNotEmpty(this.loginStatus.authedUser.account))){
                for(var i = 0; i < this.loginStatus.authedUser.rights.right.length; i++){
                    if(this.loginStatus.authedUser.rights.right[i].name === 'portal_manage_cases' && this.loginStatus.authedUser.rights.right[i].has_access === true){
                        canManage = true;
                        break;
                    }
                }
            }
            this.loginStatus.userAllowedToManageCases = canManage;
        };
        this.userAllowedToManageEmailNotifications = function(user) {
            if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && this.loginStatus.authedUser.org_admin) {
                return true;
            } else {
                return false;
            }
        };
        this.userAllowedToManageGroups = function(user) {
            if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && (!this.loginStatus.authedUser.account.has_group_acls || this.loginStatus.authedUser.account.has_group_acls && this.loginStatus.authedUser.org_admin)) {
                return true;
            } else {
                return false;
            }
        };
        this.userAllowedToManageDefaultGroups = function(user) {
            if (RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && RHAUtils.isNotEmpty(this.loginStatus.authedUser.account) && (this.loginStatus.authedUser.org_admin)) {
                return true;
            } else {
                return false;
            }
        };
        this.fetchUserAccountContacts = function(user) {
            return strataService.accounts.users(user.account_number).then((accountContacts) => {
                this.loginStatus.authedUser.accountContacts = accountContacts;
        });
        };
        this.getBasicAuthToken = function() {
            var defer = $q.defer();
            var token = localStorage.getItem('rhAuthToken');
            if (token !== undefined && token !== '') {
                defer.resolve(token);
                return defer.promise;
            } else {
                this.login().then(function(authedUser) {
                    defer.resolve(localStorage.getItem('rhAuthToken'));
                }, function(error) {
                    defer.resolve(error);
                });
                return defer.promise;
            }
        };
        this.initLoginStatus = async function() {
            this.loggingIn = true;
            this.loginFailure = false;
            var defer = $q.defer();
            // var wasLoggedIn = this.loginStatus.isLoggedIn;
            this.loginStatus.verifying = true;
            if(window.sessionjs != null && window.sessionjs.isAuthenticated() && RHAUtils.isNotEmpty(window.sessionjs.getUserInfo().account_number)) { // JWT specific auth
                const user = window.sessionjs.getUserInfo();
                //load account
                strata.addAccountNumber(user.account_number);
                const accountPromise = strataService.accounts.get(user.account_number).then((account) => {
                    this.loginStatus.account = account;
            }).catch(() => {
                    this.loginStatus.account = null;
            });
                try {
                    const configuration = await hydrajs.maintenance.getMaintenanceMode('pcm_configurations');
                    if (configuration.length >= 0) {
                        configuration.map((value) => {
                          if (value.fieldName === 'isEntitled' && value.fieldValue === '1') {
                            this.isSubscriptionServiceM = true;
                          } else if (value.fieldName === 'isCep' && value.fieldValue === '1') {
                            this.isCep = true;
                          }
                        });
                      }
                } catch(error) {
                    this.isSubscriptionServiceM = false;
                    this.isCep = false;
                    console.log('Error getting PCM Configurations' + error);
                }

                let userPromise = {};
                if (this.isSubscriptionServiceM === true) {
                    userPromise = strataService.users.getBySSO(user.username);
                } else {
                    userPromise = strataService.users.get(user.user_id);
                }

                const managedAccountsPromise = strataService.accounts.managedAccounts.get(user.account_number);
                const managersForAccountPromise = strataService.accounts.accountManagers.get(user.account_number);

                Promise.all([accountPromise, userPromise, managedAccountsPromise, managersForAccountPromise]).then(([account, authedUser, managedAccounts, accountManagers]) => {
                    // PCM-6964 hardcoded is_entitled = true when subscrition service is down
                    if (this.isSubscriptionServiceM === true) {
                        authedUser.account_number = user.account_number,
                        authedUser.preferred_language = user.lang,
                        authedUser.is_entitled = true,
                        authedUser.is_active = true,
                        authedUser.timezone = 'America/New_York',
                        authedUser.rights = {
                            "right": [
                                {
                                    "name": "AllowEmailContact",
                                    "has_access": false
                                },
                                {
                                    "name": "AllowFaxContact",
                                    "has_access": false
                                },
                                {
                                    "name": "AllowMailContact",
                                    "has_access": false
                                },
                                {
                                    "name": "AllowPhoneContact",
                                    "has_access": false
                                },
                                {
                                    "name": "AllowThirdPartyContact",
                                    "has_access": false
                                },
                                {
                                    "name": "portal_manage_cases",
                                    "description": "Customer Portal: Manage Support Cases",
                                    "has_access": true
                                },
                                {
                                    "name": "portal_manage_subscriptions",
                                    "description": "Customer Portal: Manage Subscriptions",
                                    "has_access": true
                                },
                                {
                                    "name": "portal_download",
                                    "description": "Customer Portal: Download Software and Updates",
                                    "has_access": true
                                },
                                {
                                    "name": "portal_system_management",
                                    "description": "Customer Portal: System Management",
                                    "has_access": true
                                }
                            ]
                        }
                    }
                    this.setLoginStatus(true, false, authedUser);
                this.loginStatus.authedUser.account = this.loginStatus.account;
                this.loginStatus.authedUser.managedAccounts = managedAccounts;
                this.loginStatus.authedUser.accountManagers = accountManagers;
                if(authedUser.is_internal || authedUser.org_admin) {
                    this.fetchUserAccountContacts(authedUser);
                }
                this.userAllowedToManageCases();
                this.loggingIn = false;
                // if (wasLoggedIn === false) {
                //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                // }
                defer.resolve(this.loginStatus.authedUser.loggedInUser);
            }).catch(() => {
                    this.clearLoginStatus();
                this.loggingIn = false;
                this.loginFailure = true;
                defer.reject();
            });
            } else {
                strataService.authentication.checkLogin().then(angular.bind(this, function(authedUser) {
                    if(authedUser.account) {
                        this.setAccount(authedUser.account);
                        // PCM-6964 hardcoded is_entitled = true when subscrition service is down
                        if (this.isSubscriptionServiceM === true) {
                            authedUser.is_entitled = true;
                        }
                        this.setLoginStatus(true, false, authedUser);
                        this.userAllowedToManageCases();
                        var promisesArray = [];
                        const managedAccountsPromise = strataService.accounts.managedAccounts.get(authedUser.account.number);
                        const managersForAccountPromise = strataService.accounts.accountManagers.get(authedUser.account.number);
                        promisesArray.push(managedAccountsPromise,managersForAccountPromise);

                        if(authedUser.is_internal || authedUser.org_admin) {
                            const accountContactsPromise = strataService.accounts.users(authedUser.account.number);
                            promisesArray.push(accountContactsPromise);
                        }
                        Promise.all(promisesArray).then((response) => {
                            this.loginStatus.authedUser.managedAccounts = response[0];
                        this.loginStatus.authedUser.accountManagers = response[1];
                        if(authedUser.is_internal || authedUser.org_admin) {
                            this.loginStatus.authedUser.accountContacts = response[2];
                        }
                        this.loggingIn = false;
                        //We don't want to resend the AUTH_EVENTS.loginSuccess if we are already logged in
                        // if (wasLoggedIn === false) {
                        //     $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                        // }
                        defer.resolve(authedUser.loggedInUser);
                    }).catch(() => {
                            this.clearLoginStatus();
                        AlertService.addStrataErrorMessage(error);
                        this.loggingIn = false;
                        defer.reject(error);
                    });
                    } else {
                        this.loginFailure = true;
                        this.clearLoginStatus();
                        this.loggingIn = false;
                        defer.reject();
                    }
                }), angular.bind(this, function(error) {
                    this.loginFailure = true;
                    this.clearLoginStatus();
                    AlertService.addStrataErrorMessage(error);
                    this.loggingIn = false;

                    defer.reject(error);
                }));
            }
            return defer.promise;
        };
        this.validateLogin = function(forceLogin) {
            var defer = $q.defer();
            //var that = this;
            if (!forceLogin) {
                this.initLoginStatus().then(function(username) {
                    defer.resolve(username);
                }, function(error) {
                    defer.reject(error);
                });
                return defer.promise;
            } else {
                this.initLoginStatus().then(function(username) {
                    defer.resolve(username);
                }, function(error) {
                    this.login().then(function(authedUser) {
                        defer.resolve(authedUser.loggedInUser);
                    }, function(error) {
                        defer.reject(error);
                    });
                });
                return defer.promise;
            }
        };
        this.login = function() {
            return this.showLogin(this.modalDefaults, this.modalOptions);
        };
        this.logout = function() {
            strataService.authentication.logout();
            this.clearLoginStatus();
            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        };
        this.showLogin = function(customModalDefaults, customModalOptions) {
            //var that = this;
            //Create temp objects to work with since we're in a singleton service
            var tempModalDefaults = {};
            var tempModalOptions = {};
            //Map angular-ui modal custom defaults to modal defaults defined in service
            angular.extend(tempModalDefaults, this.modalDefaults, customModalDefaults);
            //Map modal.html $scope custom properties to defaults defined in service
            angular.extend(tempModalOptions, this.modalOptions, customModalOptions);
            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = [
                    '$scope',
                    '$uibModalInstance',
                    function($scope, $uibModalInstance) {
                        $scope.user = {
                            user: null,
                            password: null
                        };
                        $scope.status = {
                            authenticating: false
                        };
                        $scope.useVerboseLoginView = LOGIN_VIEW_CONFIG.verbose;
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function(result) {
                            //Hack below is needed to handle autofill issues
                            //@see https://github.com/angular/angular.js/issues/1460
                            //BEGIN HACK
                            $scope.status.authenticating = true;
                            $scope.user.user = $('#rha-login-user-id').val();
                            $scope.user.password = $('#rha-login-password').val();
                            //END HACK
                            var resp = strataService.authentication.setCredentials($scope.user.user, $scope.user.password);
                            if (resp) {
                                this.initLoginStatus().then(
                                    function(authedUser) {
                                        $scope.user.password = '';
                                        $scope.authError = null;
                                        try {
                                            $uibModalInstance.close(authedUser);
                                        } catch (err) {}
                                        $scope.status.authenticating = false;
                                    },
                                    function(error) {
                                        if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                                            $scope.$apply(function() {
                                                $scope.authError = 'Login Failed!';
                                            });
                                        } else {
                                            $scope.authError = 'Login Failed!';
                                        }
                                        $scope.status.authenticating = false;
                                    }
                                );
                            }else {
                                $scope.authError = 'Login Failed!';
                                $scope.status.authenticating = false;
                            }
                        };
                        $scope.modalOptions.close = function() {
                            $scope.status.authenticating = false;
                            $uibModalInstance.dismiss('User Canceled Login');
                        };
                    }
                ];
            }
            return $uibModal.open(tempModalDefaults).result;
        };
    }
}
