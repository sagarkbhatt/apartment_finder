(function() {



    var log = function($scope, $rootScope, $localStorage) {
       
        var sessionUser="";
       $scope.logout = function(){
            
            $localStorage.user="";
            var path = "#/";
            $rootScope.info = "";
            window.location.href = path;
            //console.log("xc");
        };
        
    log.$inject = ['$scope', '$rootScope','$localStorage'];
  
   
     angular.element(document).ready(function() {
            sessionUser = $localStorage.user;
           
           
            if (!sessionUser || 0 === sessionUser.length) {
                
            
            } else {

                
                $rootScope.info = sessionUser;
            }
        });

    
        }
        
     angular.module('apartmentFinder').controller('logout', log);
    }())