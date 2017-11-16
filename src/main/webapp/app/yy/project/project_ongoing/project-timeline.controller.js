(function() {
    'use strict';

    angular
        .module('yyOaApp')
        .controller('ProjectTimelineController', ProjectTimelineController);

    ProjectTimelineController.$inject = ['$scope', '$rootScope', '$state', '$stateParams', '$timeout', 'ProjectManagementService', 'ProjectTimelineService'];

    function ProjectTimelineController ($scope, $rootScope, $state, $stateParams, $timeout, ProjectManagementService, ProjectTimelineService) {
        var vm = this;

        vm.projectId = $stateParams.id;
        vm.timelineEvents = [];
        vm.project = ProjectManagementService.get({id: $stateParams.id});
        vm.isLoading = false;

        vm.loadAdll = loadAll;

        loadAll();


        function loadAll() {
            vm.isLoading = true;
            ProjectTimelineService.query(
                {
                    projectId: vm.projectId,
                    sort: ['createTime,desc']
                },
                function (result) {
                    var tlByDay = {};
                    var dayFormat =  "YYYY-MM-DD";
                    $.each(result, function (index, item) {
                        var t = moment(item.createTime).format(dayFormat);
                        if (tlByDay[t] == undefined) {
                            tlByDay[t] = [];
                        }
                        tlByDay[t].push(item);
                    });

                    var timeEvents = [];
                    $.each(tlByDay, function (k, v) {
                        timeEvents.push(
                            {
                                day: k,
                                timelineEvents: v
                            }
                        )
                    });

                    var sortedEvents = timeEvents.sort(function (a, b) {
                        var t1 = moment(a.day, dayFormat);
                        var t2 = moment(b.day, dayFormat);
                        return t2.diff(t1)
                    });

                    var timeEvents = [];
                    $.each(sortedEvents, function (index, item) {
                        timeEvents.push({
                            typeId: null,
                            day: item.day
                        });
                        timeEvents = timeEvents.concat(item.timelineEvents);
                    });
                    vm.timelineEvents = timeEvents;
                    vm.isLoading = false;
                },
                function () {
                    vm.isLoading = false;
                    PNotifyLoadFail();
                }
            )
        }

    }
})();
