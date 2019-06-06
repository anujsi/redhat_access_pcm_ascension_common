'use strict';

export default () => ({
    template: require('../views/languageSelect.jade')(),
    controller: ($scope, HeaderService) => {
        $scope.HeaderService = HeaderService;
        HeaderService.initCurrentLanguage();
    }
});
