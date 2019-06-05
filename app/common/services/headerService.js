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
            {code: 'en_US', name: gettextCatalog.getString('English')},
            {code: 'de', name: gettextCatalog.getString('German')},
            {code: 'es', name: gettextCatalog.getString('Spanish')},
            {code: 'fr', name: gettextCatalog.getString('French')},
            {code: 'it', name: gettextCatalog.getString('Italian')},
            {code: 'ja', name: gettextCatalog.getString('Japanese')},
            {code: 'ko', name: gettextCatalog.getString('Korean')},
            {code: 'pt', name: gettextCatalog.getString('Portuguese')},
            {code: 'zh_CN', name: gettextCatalog.getString('Chinese')},
            {code: 'ru', name: gettextCatalog.getString('Russian')}
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
            gettextCatalog.setCurrentLanguage(this.currentLanguage);
            window.localStorage.setItem('current_language', this.currentLanguage);
            $window.location.reload();
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
