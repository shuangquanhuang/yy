(function() {
    'use strict';
    angular
        .module('yyOaApp')
        .factory('JobTitle', JobTitle);

    JobTitle.$inject = ['$resource'];

    function JobTitle ($resource) {
        var resourceUrl =  'api/job-titles/:id';

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
