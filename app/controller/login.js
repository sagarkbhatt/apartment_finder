(function() {



    var loginCtrl = function($scope, $http, $rootScope, $localStorage) {
       
 
        
     angular.element(document).ready(function() {
            sessionUser = $localStorage.user;
           
           
            if (!sessionUser || 0 === sessionUser.length) {
                
                
            } else {

                var path = "#/admin";

                window.location.href = path;
                
                $rootScope.info = sessionUser;
            }
        });
        $scope.userLogin = function() {

            $http({

                method: 'POST',
                url: 'api/login_api.php',
                data: $scope.login,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function(data) {

                if (!data.success) {
                    console.log(data.errors.exception);
                    $scope.errorCon = data.errors.con;
                    $scope.errorException = data.errors.exception;
                } else {

                    $scope.message = data.message;

                    if (data.message == 'Logged in successfully') {
                    $localStorage.user=$scope.login.username;
                     // $rootScope.userNameLogged = $localStorage.user;
                    //    $rootScope.userNameLogged = $scope.login.username;
                            
                        console.log($localStorage.user);
                        var path = "#/admin";
                        //$scope.LoggedUser=$cookies.get("userName");
                        window.location.href = path;
                    } else {
                        alert('Please check username or password');
                    }
                }

            });



        }

        $scope.submitFormReg = function() {



            $http({

                method: 'POST',
                url: 'api/register_api.php',
                data: $scope.reg,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function(data) {
                if (!data.success) {
                    // Showing errors.
                    $scope.errorName = data.errors.name;
                    $scope.errorUserName = data.errors.username;
                    $scope.errorEmail = data.errors.email;

                    $scope.errorPh = data.errors.ph;
                    $scope.errorPwd = data.errors.pwd;

                    // $scope.errorType=data.errors.type;
                    $scope.errorCon = data.errors.con;
                    $scope.errorException = data.errors.exception;

                    $scope.message = "";
                } else {

                    $scope.message = data.message;
                    //   $scope.session=data.session;
                    //  var path = "#/login";
                    //window.location.href = path
                }
            });




        }



    }
    loginCtrl.$inject = ['$scope', '$http', '$rootScope','$localStorage'];
    //var ngStore = angular.module
    angular.module('apartmentFinder').controller('login', loginCtrl);


}())