/**
 * @name: authentication controller
 * @description: process the logic for authentication
 */

angular.module('psleApp')

    .controller('AuthCtrl', function (Auth, $state, profile, $firebaseArray, FirebaseUrl) {
        
        var authCtrl = this;
    
        authCtrl.user = {
            email: '',
            password: ''
        }
        
        
        /**
         * @name: login
         * @description: allows users to login to the application
         */
        
        
        authCtrl.login = function() {
            Auth.$authWithPassword(authCtrl.user)
                .then(function (auth) {
                    $state.go('profile');
                }, function (error) {
                    authCtrl.error = error;
                });
        };
        
    
        /**
         * @name: register
         * @description: allows users to register an account using their email address
         */
    
    
        authCtrl.register = function(isValid) {
            
            if(isValid) {
                
                // registration form is valid
                Auth.$createUser(authCtrl.user)
                    .then(function (user) {
                        var usersRef = new Firebase(FirebaseUrl + 'users');
                        var users = new $firebaseArray(usersRef);

                        users.$add({
                            email: authCtrl.user.email,
                            firstName: authCtrl.user.firstName,
                            lastName: authCtrl.user.lastName
                        
                        }).then(function() {
                            authCtrl.login();
                        });
                
                    }, function (error) {
                        authCtrl.error = error;
                    });
                
            }
        };    
    
    
    });