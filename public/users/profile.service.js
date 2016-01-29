/**
 * @name: profile service
 * @description: single responsibility of returning a firebase profile object
 */

angular.module('psleApp')
    .factory('Profile', function($firebaseArray, $firebaseObject, FirebaseUrl) {
        
        var usersRef = new Firebase(FirebaseUrl + 'users');
        var users = new $firebaseArray(usersRef);
    
        var Users = {
            getProfile: function(uid) {
                return $firebaseObject(usersRef.child(uid));   
            },
            
            getDisplayName: function(uid) {
                return users.$getRecord(uid).displayName;
            },
            
            all: users
        };
    
        return Users;
    });