/*global angular*/
(function () {
    'use strict';

    angular.module('directives.general', [])
        .directive('inlineEdit', function () {
            return {
                restrict: 'A',
                scope: {
                    model: '=',
                    editStyle: '@'
                },
                template: '<span ng-hide="edit" ui-event="{dblclick:\'editable(true)\'}">{{value}}</span>' +
                    '<input style="display: none; {{editStyle}}" show-and-focus="edit" ui-event="{blur:\'editable(false)\',keydown:\'keyDown($event)\'}" ng-model="value">',
                controller: function ($scope) {
                    $scope.editable = function (edit) {
                        $scope.edit = edit;
                        $scope.value = $scope.model;
                    };
                    $scope.keyDown = function (e) {
                        switch (e.keyCode) {
                        case 13:
                            $scope.model = $scope.value;
                            $scope.editable(false);
                            break;
                        case 27:
                            $scope.editable(false);
                            break;
                        }
                    };

                    $scope.editable(false);
                }
            };
        })
        .directive('showAndFocus', function () {
            return {
                priority: 10,
                link: function (scope, element, attrs) {
                    element.css('display', 'none');
                    scope.$watch(attrs.showAndFocus, function (value) {
                        if (value) {
                            element.css('display', '');
                            element[0].focus();
                            element[0].select();
                        } else {
                            element.css('display', 'none');
                        }
                    });
                }
            };
        });
}());