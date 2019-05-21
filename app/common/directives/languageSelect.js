'use strict';

export default () => ({
    template: require('../views/languageSelect.jade')(),
    controller: ($scope, CaseService, gettextCatalog) => {
        // The current language the text will be in.
        $scope.currentLanguage = gettextCatalog.currentLanguage;

        // The languages we have translations for
        $scope.supportedLanguages = [
            {code: 'en', name: 'English'},
            {code: 'de', name: 'German'},
            {code: 'es', name: 'Spanish'},
            {code: 'fr', name: 'French'},
            {code: 'it', name: 'Italian'},
            {code: 'ja', name: 'Japanese'},
            {code: 'ko', name: 'Korean'},
            {code: 'pt', name: 'Portuguese'},
            {code: 'zh_CN', name: 'Chinese'},
            {code: 'ru', name: 'Russia'}
        ];

        // Switches the current language and broadcasts a 'change_language' event.
        $scope.changeCurrentLanguage = (newLanguage) => {
            $scope.currentLanguage = newLanguage;
            gettextCatalog.setCurrentLanguage(newLanguage);
        };
    }
});
