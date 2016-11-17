(function() {



    var home = function($scope, $http, $q,$localStorage) {
        
        var aptInfo= {};
        var aptArr = [];
            
    console.log('data');

     angular.element(document).ready(function() {
           // sessionUser = $localStorage.user;
           
           console.log('data');
              $http.get('api/fetchApt.php').then(function(data) {

                console.log(data);
                data= data.data;
                if(data.success){

                    var i=0;

                    for(i=0;i<data.user.length;i++){
                    aptInfo.user=data.user[i];
                    aptInfo.lon=data.lon[i];
                    aptInfo.lat=data.lat[i];
                    aptInfo.tag=data.tag[i];
                    aptInfo.add=data.add[i];
                    aptInfo.rad=data.rad[i];
                    aptArr.push(aptInfo);
                    aptInfo={};
                    }
                    $scope.data = aptArr;

                }

            })

        });
    
    
        

    }
        
    home.$inject = ['$scope', '$http', '$q','$localStorage'];

    angular.module('apartmentFinder').controller('home', home);

}())