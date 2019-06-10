'use strict';

export default class TitleViewCtrl {
    constructor (COMMON_CONFIG, $scope, gettextCatalog, CaseService) {
        'ngInject';

        $scope.COMMON_CONFIG = COMMON_CONFIG;
        $scope.showTitle = COMMON_CONFIG.show;
        $scope.titlePrefix = COMMON_CONFIG.titlePrefix;
        $scope.CaseService = CaseService;
        $scope.getClassPage = () => $scope.page;
        $scope.getPageTitle = function () {
            switch ($scope.page) {
                case 'search':
                    return gettextCatalog.getString('Search');
                case 'caseList':
                    return gettextCatalog.getString('SUPPORT CASES');
                case 'caseView':
                    return gettextCatalog.getString('CASE {{caseNumber}}', {caseNumber: CaseService.kase.case_number});
                case 'newCase':
                    return gettextCatalog.getString('Open a Support Case');
                case 'logViewer':
                    return gettextCatalog.getString('Logs');
                case 'searchCase':
                    return gettextCatalog.getString('Search Support Case');
                case 'manageGroups':
                    return gettextCatalog.getString('Manage Case Groups');
                case 'editGroup':
                    return gettextCatalog.getString('Manage Default Case Groups');
                default:
                    return '';
            }
        };
    }
}
