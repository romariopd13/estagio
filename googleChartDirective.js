/**
 * @description Google Chart Api Directive Module for AngularJS
 * @version 0.1
 * @author Nicolas Bouillon <nicolas@bouil.org>
 * @license MIT
 * @year 2013
 */
(function () {
    'use strict';

    angular.module('googlechart.directives', []).directive('googleChart', ['$timeout', '$window', function ($timeout, $window) {
        return {
            restrict: 'A',
            scope: {
                chart: '=chart'
            },
            link: function ($scope, $elm, $attr) {

                // Watches, to refresh the chart when its data, title or dimensions change
                $scope.$watch('chart', function () {
                    draw();

                }, true); // true is for deep object equality checking

                // Redraw the chart if the window is resized 
                angular.element($window).bind('resize', function () {
                    draw();
                });

                function draw() {
                    if (!draw.triggered && ($scope.chart != undefined)) {
                        draw.triggered = true;
                        $timeout(function () {
                            draw.triggered = false;
                            var dataTable = new google.visualization.DataTable($scope.chart.data, 0.5);

                            var chartWrapperArgs = {
                                chartType: $scope.chart.type,
                                dataTable: dataTable,
                                view: $scope.chart.view,
                                options: $scope.chart.options,
                                containerId: $elm[0]
                            };

                            if($scope.chartWrapper==null) {
                                $scope.chartWrapper = new google.visualization.ChartWrapper(chartWrapperArgs);
                                $scope.readyListener = google.visualization.events.addListener($scope.chartWrapper, 'ready', function () {
                                    $scope.chart.displayed = true;

                                    setUpListeners($scope);
                                    /**
                                     * Callbacks for chart ready
                                     */
                                    if(typeof $scope.chart.methods !== "undefined" && typeof $scope.chart.methods.ready !== "undefined"){
                                        $scope.chart.methods.ready();
                                    }
                                });
                                $scope.readyListener = google.visualization.events.addListener($scope.chartWrapper, 'error', function (err) {
                                    console.log("Chart not displayed due to error: " + err.message);

                                    /**
                                     * Callbacks for chart error
                                     */
                                    if(typeof $scope.chart.methods !== "undefined" && typeof $scope.chart.methods.error !== "undefined"){
                                        $scope.chart.methods.error(err);
                                    }

                                });

                            }
                            else {
                                $scope.chartWrapper.setChartType($scope.chart.type);
                                $scope.chartWrapper.setDataTable(dataTable);
                                $scope.chartWrapper.setView($scope.chart.view);
                                $scope.chartWrapper.setOptions($scope.chart.options);
                                setUpListeners($scope);
                            }

                            $timeout(function () {
                                $scope.chartWrapper.draw();

                            });
                        }, 0, true);
                    }
                }

            }
        };
    }]);

    function setUpListeners($scope){
        /**
         *  Reset all the listeners.
         */
         if(typeof $scope.onMouseOutListener !== "undefined"){
             google.visualization.events.removeListener($scope.onMouseOutListener);
             delete $scope.onMouseOutListener;
         }
        if(typeof $scope.onMouseOverListener !== "undefined"){
            google.visualization.events.removeListener($scope.onMouseOverListener);
            delete $scope.onMouseOverLisstener;
        }
        if(typeof $scope.selectListener !== "undefined"){
            google.visualization.events.removeListener($scope.selectListener);
            delete $scope.selectListener;
        }
        if(typeof $scope.animationFinishListener !== "undefined"){
            google.visualization.events.removeListener($scope.animationFinishListener);
            delete $scope.animationFinishListener;
        }

        /**
         * Callbacks for Selection in chart
         */

        if(typeof $scope.chart.methods !== "undefined" && typeof $scope.chart.methods.select !== "undefined"){
            $scope.selectListener = google.visualization.events.addListener($scope.chartWrapper, "select", function (event) {
                $scope.chart.methods.select($scope.chartWrapper.getChart().getSelection(), event);
                if (!$scope.$$phase){
                    $scope.$apply();
                }
            });
        }
        /**
         * Callbacks for onmouseover in chart
         */

        if(typeof $scope.chart.methods !== "undefined" && typeof $scope.chart.methods.onmouseover !== "undefined" && typeof $scope.chartWrapper.getChart() !== "undefined" && $scope.chartWrapper.getChart()!== null){
            $scope.onMouseOverListener =google.visualization.events.addListener($scope.chartWrapper.getChart(), "onmouseover", function (event) {
                $scope.chart.methods.onmouseover(event);
                if (!$scope.$$phase){
                    $scope.$apply();
                }
            });
        }
        /**
         * Callbacks for onmouseout in chart
         */

        if(typeof $scope.chart.methods !== "undefined" && typeof $scope.chart.methods.onmouseout !== "undefined" && typeof $scope.chartWrapper.getChart() !== "undefined" && $scope.chartWrapper.getChart()!== null){
            $scope.onMouseOutListener = google.visualization.events.addListener($scope.chartWrapper.getChart(), "onmouseout", function (event) {
                $scope.chart.methods.onmouseout(event);
                if (!$scope.$$phase){
                    $scope.$apply();
                }
            });
        }
        /**
         * Callbacks for animationFinish in chart
         */

        if(typeof $scope.chart.methods !== "undefined" && typeof $scope.chart.methods.animationfinish !== "undefined" && typeof $scope.chartWrapper.getChart() !== "undefined" && $scope.chartWrapper.getChart()!== null){
            $scope.animationFinishListener =google.visualization.events.addListener($scope.chartWrapper.getChart(), "animationfinish", function (event) {
                $scope.chart.methods.animationfinish(event);
                if (!$scope.$$phase){
                    $scope.$apply();
                }
            });
        }



    }

})();