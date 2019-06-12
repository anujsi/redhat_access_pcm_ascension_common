'use strict';

export default class HeaderService {
    constructor(COMMON_CONFIG, gettextCatalog, strataService, securityService, AlertService, $q, $window) {
        'ngInject';

        this.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
        this.pageLoading = false;
        this.pageLoadFailure = false;
        this.showSurvey = true;
        this.showPartnerEscalationError = false;

        this.getRhLocale = () => {
            const locale = document.cookie.split(';').filter((item) => item.trim().startsWith('rh_locale='))[0];
            return locale ? locale.replace('rh_locale=', '').trim() : 'en';
        };

        this.initCurrentLanguage = () => {
            const currentLocale = this.getRhLocale();
            const lastLocale = window.localStorage.getItem('last_rh_locale');

            let currentLanguage;
            if (lastLocale === currentLocale) {
                currentLanguage = window.localStorage.getItem('current_language');
            } else {
                currentLanguage = currentLocale === 'en_US' ? 'en' : currentLocale;
                window.localStorage.setItem('current_language', currentLanguage);
            }

            if (currentLanguage && currentLanguage !== gettextCatalog.currentLanguage) {
                gettextCatalog.setCurrentLanguage(currentLanguage);
                this.currentLanguage = currentLanguage;
            } else {
                this.currentLanguage = gettextCatalog.currentLanguage;
            }

            if (!lastLocale || lastLocale !== currentLocale) {
                window.localStorage.setItem('last_rh_locale', currentLocale);
            }
        };

        // Switches the current language.
        this.changeCurrentLanguage = () => {
            const changeLanguageChromeLink = document.getElementById(this.currentLanguage);
            gettextCatalog.setCurrentLanguage(this.currentLanguage);
            window.localStorage.setItem('current_language', this.currentLanguage);

            if (!changeLanguageChromeLink) {
                $window.location.reload();
            } else {
                window.localStorage.removeItem('last_rh_locale');
                changeLanguageChromeLink.click();
            }
        };

        this.checkSfdcHealth = function () {
            if (securityService.loginStatus.isLoggedIn) {
                const deferred = $q.defer();
                strataService.health.sfdc().then(angular.bind(this, function (response) {
                    if (response.name === 'SFDC' && response.status === true) {
                        service.sfdcIsHealthy = true;
                    }
                    deferred.resolve(response);
                }), angular.bind(this, function (error) {
                    if (error.xhr.status === 502) {
                        service.sfdcIsHealthy = false;
                    }
                    AlertService.addStrataErrorMessage(error);
                    deferred.reject();
                }));
                return deferred.promise;
            }
        };
    };
}
