(function() {
    'use strict';

    angular
        .module('yiyingOaApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('employee', {
            parent: 'entity',
            url: '/employee?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yiyingOaApp.employee.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/employee/employees.html',
                    controller: 'EmployeeController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('employee');
                    $translatePartialLoader.addPart('gender');
                    $translatePartialLoader.addPart('education');
                    $translatePartialLoader.addPart('jobPositionStatus');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('employee-detail', {
            parent: 'entity',
            url: '/employee/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'yiyingOaApp.employee.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/employee/employee-detail.html',
                    controller: 'EmployeeDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('employee');
                    $translatePartialLoader.addPart('gender');
                    $translatePartialLoader.addPart('education');
                    $translatePartialLoader.addPart('jobPositionStatus');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Employee', function($stateParams, Employee) {
                    return Employee.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'employee',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('employee-detail.edit', {
            parent: 'employee-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/employee/employee-dialog.html',
                    controller: 'EmployeeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Employee', function(Employee) {
                            return Employee.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('employee.new', {
            parent: 'employee',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/employee/employee-dialog.html',
                    controller: 'EmployeeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                gender: null,
                                age: null,
                                education: null,
                                empNumber: null,
                                nativePlace: null,
                                nationality: null,
                                idNumber: null,
                                basicInfo: null,
                                hireDate: null,
                                probationSalary: null,
                                salary: null,
                                jobPositionStatus: null,
                                jobPositionInfo: null,
                                birthDate: null,
                                marriage: null,
                                childbearing: null,
                                hukou: null,
                                pensionAccount: null,
                                houseFoundAccount: null,
                                hasDriverLicense: null,
                                cellphone: null,
                                mail: null,
                                qq: null,
                                workQq: null,
                                workQqPassword: null,
                                wechart: null,
                                address: null,
                                tel: null,
                                emergencyTel: null,
                                emergencyContact: null,
                                relationshipWithEmergencyContact: null,
                                additionalInfo: null,
                                computerLevel: null,
                                foreignLanguageLevel: null,
                                probationDeduction: null,
                                employeeDeduction: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('employee', null, { reload: 'employee' });
                }, function() {
                    $state.go('employee');
                });
            }]
        })
        .state('employee.edit', {
            parent: 'employee',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/employee/employee-dialog.html',
                    controller: 'EmployeeDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Employee', function(Employee) {
                            return Employee.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('employee', null, { reload: 'employee' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('employee.delete', {
            parent: 'employee',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/employee/employee-delete-dialog.html',
                    controller: 'EmployeeDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Employee', function(Employee) {
                            return Employee.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('employee', null, { reload: 'employee' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
