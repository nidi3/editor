/*global angular,_*/
(function () {
    'use strict';

    angular.module('main', ['io'])
        .service('io', function (LocalStorage) {
            var storageName = 'editor-state';
            this.load = function () {
                var res = LocalStorage.load(storageName);
                res.tabs = res.tabs || [
                    {key: 'text1', value: ''}
                ];
                if (!res.currentIndex || res.currentIndex < 0 || res.currentIndex >= res.tabs.length) {
                    res.currentIndex = 0;
                }
                return res;
            };
            this.save = function (state) {
                LocalStorage.store(storageName, state);
            };
        })
        .controller('EditorCtrl', function ($scope, io) {
            var
                state = io.load(),
                findTabByKey = function (key) {
                    return _.find(state.tabs, function (text) {
                        return text.key === key;
                    });
                },
                findNewKey = function () {
                    var i = 0, key;
                    do {
                        i += 1;
                        key = 'text' + i;
                    } while (findTabByKey(key));
                    return key;
                },
                currentTab = function () {
                    return state.tabs[state.currentIndex];
                },
                setValueOfCurrentTab = function (value) {
                    currentTab().value = value;
                    io.save(state);
                },
                setCurrentTab = function (index) {
                    state.currentIndex = index;
                    io.save(state);
                    return currentTab().value;
                };
$scope.val='dddd';
            $scope.tabs = state.tabs;
            $scope.value = currentTab().value;

            $scope.addTab = function () {
                var key = findNewKey();
                state.tabs.push({key: key, value: ''});
                $scope.value = setCurrentTab(state.tabs.length - 1);
            };
            $scope.activateTab = function (index) {
                setValueOfCurrentTab($scope.value);
                $scope.value = setCurrentTab(index);
            };
            $scope.isTabActive = function (index) {
                return state.currentIndex === index;
            };
            $scope.isTabDeletable = function (index) {
                return state.tabs.length > 1 && state.currentIndex === index;
            };
            $scope.deleteTab = function (index) {
                state.tabs.splice(index, 1);
                $scope.value = setCurrentTab(index < state.tabs.length ? index : index - 1);
            };
            $scope.saveCurrentValue = function () {
                setValueOfCurrentTab($scope.value);
            };
        });
}());