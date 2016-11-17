(function() {


    var userPanel = function($scope, $http, $rootScope,$localStorage,$q,$filter) {

        var sessionUser = null;
        $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBYOjO9aLCz4KgUsDVPInVmK8PxyLNBq7M";
    
         var tagData =[];
         $scope.tagsString='';      
        angular.element(document).ready(function() {
            sessionUser = $localStorage.user;

            
           /* $scope.change= function(){

                 console.log($scope.tags);
                console.log($scope.tagsString); 
            }*/

             $scope.tags = [
                { text: 'nirma' },
                { text: 'university' },
               
            ];

            $http.get('api/tags.php').then(function(data){
                    
                     var ob ={};
                   
                     data = data.data;
                     if(data.success){
                         console.log(data);
                         var temp =data.tags;
                         var i=0;
                         
                         for(i=0;i<temp.length;i++){
                            console.log(temp[i]);
                             ob.text=temp[i].toLowerCase();
                             
                             tagData.push(ob);
                            ob = {};
                         }

                     }
                    console.log(tagData);
                });
            
             
           /// $rootScope.showDiv =true;
            console.log(sessionUser);
            if (!sessionUser || 0 === sessionUser.length) {
                var path = "#/login";

                window.location.href = path;
            } else {

                $scope.LoggedUser = sessionUser;
                $rootScope.info = sessionUser;
            }
        });
        
   
         $scope.loadTags = function(query) {
                /*var deferred = $q.defer();
                deferred.resolve( $filter('filter')(tagData, query));
                //deferred.resolve(tagData);
                return deferred.promise;
                //
                */
                
                return tagData;
        };

        $scope.btnSubmit = function(){

            var lat=$scope.txtLat;
            var lon=$scope.txtLon;
            var tagsString = $scope.tags.map(function(tag) { return tag.text; });
           tagsString =tagsString.join(" ");
            var add = $scope.txtaddress;
            var radius = $scope.radius;

            var ob ={};

            ob.lat=lat;
            ob.lon=lon;
            ob.tag=tagsString;
            ob.add=add;
            ob.radius =radius;
            ob.username = sessionUser;
            

            console.log(ob);
            $http({

                method: 'POST',
                url: 'api/addApt.php',
                data: ob,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function(data) {
                console.log(data);
                
                //data = data.data;
                if(data.success){

                    $scope.message =data.message;
                }
        
             })

        };

        $scope.showVerify = function(){

            var identity = [];
            var x ={};
            var ob ={ 'username':sessionUser };
             $http({

                method: 'POST',
                url: 'api/identity.php',
                data: ob,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function(data) {
                console.log(data);
                
               
                if(data.success){
                    var i =0;
                    for(i=0;i<data.user.length;i++){
                    x.user =data.user[i];
                    x.add = data.add[i];
                    x.verify =data.verify[i];
                    if(!(x.verify)){
                        x.verify='';
                    }
                    identity.push(x);
                    x = {};
                   // $scope.message =data.message;
                    }
                 }
                 $scope.verify =identity;
             })
        }
     }
    userPanel.$inject = ['$scope', '$http', '$rootScope','$localStorage','$q','$filter'];
    angular.module('apartmentFinder').controller('userPanel', userPanel);

}())