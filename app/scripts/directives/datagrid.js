geodatadisplayModule.directive('datagrid', function() {
    var linker = function(scope, element, attrs) {
        console.log('Executing Linker function for datagrid directive');

    };
    return {
        restrict: 'E',
        link: linker,
        require: '^geodatadisplay',
        scope: {}
    };
});