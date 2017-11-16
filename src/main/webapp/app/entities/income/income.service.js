(function() {
    'use strict';
    angular
        .module('yyOaApp')
        .factory('Income', Income);

    Income.$inject = ['$resource'];

    function Income ($resource) {
        var resourceUrl =  'api/incomes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
