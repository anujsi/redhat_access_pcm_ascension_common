'use strict';

export default class AlertService {
    constructor($filter, AUTH_EVENTS, $rootScope, RHAUtils, gettextCatalog) {
        'ngInject';

        const ALERT_TYPES = {
            DANGER: 'danger',
            SUCCESS: 'success',
            WARNING: 'warning',
            INFO: 'info'
        };
        this.alerts = [];
        //array of {message: 'some alert', type: '<type>'} objects
        this.clearAlerts = function () {
            this.alerts = [];
        };
        this.addAlert = function (alert) {
            this.alerts.push(alert);
        };
        this.removeAlert = function (alert) {
            this.alerts.splice(this.alerts.indexOf(alert), 1);
        };
        this.addDangerMessage = function (message, isHtml) {
            return this.addMessage(message, ALERT_TYPES.DANGER, isHtml);
        };
        this.addSuccessMessage = function (message, isHtml) {
            return this.addMessage(message, ALERT_TYPES.SUCCESS, isHtml);
        };
        this.addWarningMessage = function (message, isHtml) {
            return this.addMessage(message, ALERT_TYPES.WARNING, isHtml);
        };
        this.addInfoMessage = function (message, isHtml) {
            return this.addMessage(message, ALERT_TYPES.INFO, isHtml);
        };
        this.addMessage = function (message, type, isHtml) {
            var alert = {
                message: message,
                type: type === null ? 'warning' : type,
                isHtml: isHtml
            };
            this.addAlert(alert);
            $('body,html').animate({ scrollTop: $('body').offset().top }, 100);
            //Angular adds a unique hash to each alert during data binding,
            //so the returned alert will be unique even if the
            //message and type are identical.
            return alert;
        };
        this.getErrors = function () {
            var errors = $filter('filter')(this.alerts, { type: ALERT_TYPES.DANGER });
            if (errors === null) {
                errors = [];
            }
            return errors;
        };
        this.addStrataErrorMessage = function (error) {
            if (RHAUtils.isNotEmpty(error)) {
                var errorText = error.message;
                if (error.xhr && error.xhr.responseText) {
                    errorText = errorText.concat(' Message: ' + error.xhr.responseText);
                }
                if (error.xhr && error.xhr.status === 500) {
                    strata.logToSentry(errorText);
                    errorText = 'Something went wrong.';
                }
                var existingMessage = $filter('filter')(this.alerts, {
                    type: ALERT_TYPES.DANGER,
                    message: errorText
                });
                if (existingMessage.length < 1) {
                    this.addDangerMessage(errorText);
                }
            }
        };
        this.addUDSErrorMessage = function (error) {
            if (RHAUtils.isNotEmpty(error) && RHAUtils.isNotEmpty(error.responseText)) {
                this.addDangerMessage(error.responseText);
            }
        };
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, angular.bind(this, function () {
            this.clearAlerts();
            this.addMessage(gettextCatalog.getString('You have successfully logged out of the Red Hat Customer Portal.'));
        }));
        $rootScope.$on(AUTH_EVENTS.loginSuccess, angular.bind(this, function () {
            this.clearAlerts();
        }));
    }
}
