'use strict';

export default class HeaderService {
    constructor(COMMON_CONFIG, gettextCatalog, strataService, securityService, AlertService, $q, $window) {
        'ngInject';

        this.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
        this.pageLoading = false;
        this.pageLoadFailure = false;
        this.showSurvey = true;
        this.showPartnerEscalationError = false;

        // The languages we have translations for
        this.supportedLanguages = [
            {code: 'en_US', name: 'English'},
            {code: 'de', name: 'German'},
            {code: 'es', name: 'Spanish'},
            {code: 'fr', name: 'French'},
            {code: 'it', name: 'Italian'},
            {code: 'ja', name: 'Japanese'},
            {code: 'ko', name: 'Korean'},
            {code: 'pt', name: 'Portuguese'},
            {code: 'zh_CN', name: 'Chinese'},
            {code: 'ru', name: 'Russian'}
        ];

        this.initCurrentLanguage = () => {
            // The current language the text will be in.
            const currentLanguage = window.localStorage.getItem('current_language');
            if (currentLanguage && currentLanguage !== gettextCatalog.currentLanguage) {
                gettextCatalog.setCurrentLanguage(currentLanguage);
                this.currentLanguage = currentLanguage;
            } else {
                this.currentLanguage = gettextCatalog.currentLanguage;
            }
        };

        // Switches the current language.
        this.changeCurrentLanguage = () => {
            console.log(this.currentLanguage)
            // this.currentLanguage = newLanguage;
            // gettextCatalog.setCurrentLanguage(newLanguage);
            // window.localStorage.setItem('current_language', newLanguage);
            // $window.location.reload();
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
