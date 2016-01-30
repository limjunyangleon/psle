/**
 * @name: authentication controller
 * @description: process the logic for authentication
 */

angular.module('psleApp')

    .controller('AuthCtrl', function (Auth, $state, $firebaseArray, $firebaseObject, FirebaseUrl) {
        
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
                        var savedProfile = $firebaseObject(usersRef.child(user.uid));
                    
                        savedProfile.email = authCtrl.user.email;
                        savedProfile.firstName = authCtrl.user.firstName;
                        savedProfile.lastName = authCtrl.user.lastName;
                                        
                        savedProfile.$save().then(function() {
                            authCtrl.login();
                        });
                
                    }, function (error) {
                        authCtrl.error = error;
                    });
                
            }
        };    
    
    
    });