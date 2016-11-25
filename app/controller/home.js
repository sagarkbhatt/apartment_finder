(function() {



    var home = function($scope, $http, $q,$localStorage) {
        
        var aptInfo= {};
        var aptArr = [];
        $scope.askInfo = '';    
    console.log('data');
var sessionUser='';
     angular.element(document).ready(function() {


           sessionUser = $localStorage.user;
           $scope.client
             $scope.tags = [
                { text: 'nirma' }
               
            ];
           var tagData =[];

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
            

            
         $scope.loadTags = function(query) {
                /*var deferred = $q.defer();
                deferred.resolve( $filter('filter')(tagData, query));
                //deferred.resolve(tagData);
                return deferred.promise;
                //
                */
                
                return tagData;
        };

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
                    aptInfo.img=data.img[i];
                    aptInfo.verify=data.verify[i];
                    aptInfo.id=data.id[i];
                    aptArr.push(aptInfo);
                    aptInfo={};
                    }
                    $scope.data = aptArr;
                    console.log($scope.data);
                }

            })

        });
    
        
   $scope.inquiry = function(){

       $http({

                method: 'POST',
                url: 'api/inquiry.php',
                data: {'user':$scope.clientUsername,'flatid':$scope.askInfo},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function(data) {
                console.log(data);
                
               // data = data.data;
                if(data.success){

                    $scope.inqMessage =data.msg;
                }

                alert($scope.inqMessage + ' for Aptid:' +$scope.askInfo);
        
             })
  

     }

        
        $scope.askDetail = function(x){

            $scope.askInfo = x.id;
            console.log(x);
            console.log($scope.askInfo);
            
            $scope.clientUsername = sessionUser;

        }
    
        

    }
        
    home.$inject = ['$scope', '$http', '$q','$localStorage'];

    angular.module('apartmentFinder').controller('home', home);


     angular.module('apartmentFinder').filter('filterByTags', function () {
  return function (items, tags) {
    var filtered = [];
    (items || []).forEach(function (item) {
      var matches = tags.some(function (tag) {
        return (item.tag.indexOf(tag.text) > -1) ;
      });
      if (matches) {
        filtered.push(item);
      }
    });
    return filtered;
  };
});


}())