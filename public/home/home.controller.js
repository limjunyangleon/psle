/**
 * @name: home controller
 * @description: process the logic for the home page
 */

angular.module('psleApp')

    .controller('HomeCtrl', function (Auth, $state) {
        
        var homeCtrl = this;
        
        
        /**
         * @name: logout
         * @description: allows users to logout of the application
         */
        
        homeCtrl.logout = function () {
            Auth.$unauth();
            $state.go('login');
        }
    
    
    });