'use strict';
geodatadisplayModule.directive('dvDataset', ['$resource', '$q', '$http', 'util',
    function($resource, $q, $http, util) {
        var q = $q;
        var http = $http;
        var linker = function(scope, element, attrs) {
            console.log('Executing Linker function for dataset directive');
            console.dir(attrs);
            console.log('Scope id for dataset directive is ' + scope.$id);
            console.dir(scope);

            //var dataset = new datasetModel();
            var dataset = new Dataset();
            dataset.src = attrs.src;
            dataset.name = attrs.name;
            dataset.q = q;
            dataset.http = http;
            if (attrs.columnMap) {
                dataset.column_mapping = JSON.parse(attrs.columnMap);
            }
            if(attrs.iconColor){
                dataset.iconColor = attrs.iconColor;
            }
            console.log(util.randomColor());
            dataset.iconColor = util.randomColor();
            dataset.icon = MapIconMaker.createMarkerIcon({'primaryColor': dataset.iconColor});
            console.log(dataset.icon);
            scope.displayManager.datasetRepository.addDataset(dataset);

        };
        return {
            restrict: 'E',
            link: linker,
            require: ['^dvContainer']
        };
    }
]);