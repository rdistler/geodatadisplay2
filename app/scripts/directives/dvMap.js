'use strict';
geodatadisplayModule.directive('dvMap', function() {
        var linker = function(scope, element, attrs) {
            console.log('Executing Linker function for map directive');

            var myOptions = {
                zoom: 14,
                center: new google.maps.LatLng(38.5704613, -92.1737346),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(element['0'], myOptions);
            map.mc = new MarkerClusterer(map);
            scope.displayManager.map.google_map = map;
        }

            return {
                restrict: 'E',
                link: linker,
                require: '^dvContainer',
                template: '<div></div>',
                replace: true
            };
        });