/*global angular*/
(function () {
    'use strict';

    angular.module('io', [])
        .service('LocalStorage', function () {
            this.load = function (key) {
                try {
                    return JSON.parse(localStorage.getItem(key)) || {};
                } catch (e) {
                    return {};
                }
            };
            this.store = function (key, value) {
                localStorage.setItem(key, JSON.stringify(value));
            };
            this.remove = function (key) {
                localStorage.removeItem(key);
            };
        });
}());