(function() {



    var home = function($scope, $http, $q,$localStorage) {
        
        var aptInfo= {};
        var aptArr = [];
            
    console.log('data');

     angular.element(document).ready(function() {


           // sessionUser = $localStorage.user;
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
                    aptArr.push(aptInfo);
                    aptInfo={};
                    }
                    $scope.data = aptArr;
                    console.log($scope.data);
                }

            })

        });
    
    
        

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