'use strict';

export default class HeaderService {
    constructor(COMMON_CONFIG, gettextCatalog, strataService, securityService, AlertService, $q, $window, $rootScope) {
        'ngInject';

        this.sfdcIsHealthy = COMMON_CONFIG.sfdcIsHealthy;
        this.pageLoading = false;
        this.pageLoadFailure = false;
        this.showSurvey = true;
        this.showPartnerEscalationError = false;

        // The languages we have translations for
        this.supportedLanguages = [
            {code: 'en', name: gettextCatalog.getString('English')},
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

        this.getRhLocale = () => {
            return document.cookie.split(';').filter((item) => item.trim().startsWith('rh_locale='))[0].replace('rh_locale=', '').trim();
        };

        this.initCurrentLanguage = () => {
            const currentLocale = this.getRhLocale();
            const lastLocale = window.localStorage.getItem('last_rh_locale');

            let currentLanguage;
            if (lastLocale === currentLocale) {
                currentLanguage = window.localStorage.getItem('current_language');
            } else {
                currentLanguage = currentLocale;
                window.localStorage.setItem('current_language', currentLocale);
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
