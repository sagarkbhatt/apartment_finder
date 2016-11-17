(function(){
var demoApp= angular.module('apartmentFinder',['ngRoute','ngStorage','ngTagsInput']);

demoApp.config(function($routeProvider) {

    $routeProvider
        .when('/',{
        controller: 'home',
        templateUrl:'app/views/view1.html'
        })
         
        .when('/registration',{
        controller: 'login',
        templateUrl: 'app/views/registration.html'
        })
        .when('/admin',{
        controller: 'userPanel',
        templateUrl: 'app/views/userPanel_new.html'
        })
        .when('/about',{
        controller: '',
        templateUrl: 'app/views/about_us.html'
        })
        .when('/login',{
        controller: 'login',
        templateUrl: 'app/views/login.html'
        })
    
    
        .otherwise( {redirectTo:'/'} );
    
    });

}());