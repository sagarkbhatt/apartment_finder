(function() {


    var userPanel = function($scope, $http, $rootScope,$localStorage,$q,$filter,fileUpload) {

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
                    x.flat=data.flat[i];
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
     
    $scope.uploadFile = function(){
        var file = $scope.myFile;
        console.log('file is ' + file);
        console.dir(file);

        var uploadUrl = "api/save_form.php";
        var text = $scope.viewName;
        //flat id 
        var id = $scope.imageId;
        fileUpload.uploadFileToUrl(file, uploadUrl, text,id);
   };

     
    $scope.btnVerify = function(){
        var file = $scope.DocFile;
        console.log('file is ' + file);
        console.dir(file);

        var uploadUrl = "api/save_form.php";
        var text = "Document";
        //flat id 
        var id = $scope.docId;
        fileUpload.uploadFileToUrl(file, uploadUrl, text,id);
   };
   

   $scope.getHistory= function(){

        
        var aptInfo= {};
        var aptArr = [];
       var path = 'api/fetchApt.php?user='+sessionUser;
       $http.get(path).then(function(data) {

                console.log(data);
                data= data.data;
                if(data.success){

                    var i=0;
                    
                    for(i=0;i<data.user.length;i++){
                    aptInfo.id=data.id[i];    
                    aptInfo.user=data.user[i];
                    aptInfo.lon=data.lon[i];
                    aptInfo.lat=data.lat[i];
                    aptInfo.tag=data.tag[i];
                    aptInfo.add=data.add[i];
                    aptInfo.rad=data.rad[i];
                    aptArr.push(aptInfo);
                    aptInfo={};
                    }
                    $scope.history = aptArr;

                }

            })

   }
   $scope.addImage = function(x){

       $scope.imageId =x.id;
   }

    $scope.addDoc = function(x){

       $scope.docId =x.flat;
   }

   $scope.notification = function(){
       
       var dataArr =[];
       var path = 'api/notification.php?user='+sessionUser;
       $http.get(path).then(function(data) {
           console.log(data);
           data = data.data;

           obData ={};

           for(i=0;i<data.clientid.length;i++){

               obData.id = data.flatid[i];
               obData.client = data.clientid[i];

               dataArr.push(obData);
               console.log(obData);
               obData = {};

           } 

           $scope.NotificationData = dataArr;

           console.log($scope.NotificationData);
       })




   }


        
    }
    userPanel.$inject = ['$scope', '$http', '$rootScope','$localStorage','$q','$filter','fileUpload'];
    angular.module('apartmentFinder').controller('userPanel', userPanel);
    
    angular.module('apartmentFinder').service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl, name,id){
         var fd = new FormData();
         fd.append('file', file);
         fd.append('name', name);
         fd.append('id',id);
         
         $http.post(uploadUrl, fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined,'Process-Data': false}
         })
         .success(function(data){
            console.log(data); 
            console.log("Success");
            alert('Image uploaded');
         })
         .error(function(){
            console.log("Success");
         });
     }
 }]);


 angular.module('apartmentFinder').directive('fileModel', ['$parse', function ($parse) {
    return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function(){
            scope.$apply(function(){
                modelSetter(scope, element[0].files[0]);
            });
        });
    }
   };
}]);





}())