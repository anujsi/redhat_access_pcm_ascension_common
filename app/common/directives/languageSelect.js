'use strict';

export default () => ({
    template: require('../views/languageSelect.jade')(),
    controller: ($scope, HeaderService, SUPPORTED_LANGUAGES) => {
        $scope.supportedLanguages = SUPPORTED_LANGUAGES;
        $scope.HeaderService = HeaderService;
        HeaderService.initCurrentLanguage();
    }
});
