/**
 * @name: profile controller
 * @description: process the logic for profiling
 */

angular.module('psleApp')

    .controller('ProfileCtrl', function (Auth, $state, profile, $firebaseArray, FirebaseUrl) {
        
        var profileCtrl = this;
    
        profileCtrl.profile = profile;

    
        /**
         * @name: listOfPrimaryYears
         * @type: variable
         * @description: provides a list of all the primary years
         */
        
        profileCtrl.listOfPrimaryYears = [
            'Primary 1',
            'Primary 2',
            'Primary 3',
            'Primary 4',
            'Primary 5',
            'Primary 6',
        ];
        
    
        /**
         * @name: listOfGenders
         * @type: variable
         * @description: provides a list of all the genders
         */
    
        profileCtrl.listOfGenders = [
            'Male',
            'Female'
        ]
        
    
        /**
         * @name: listOfPriSchools
         * @type: variable
         * @description: provides a list of all the primary schools in singapore
         */
        
        var priSchoolArray = $firebaseArray(new Firebase(FirebaseUrl + '1'));
        
        priSchoolArray.$loaded(function(results) {
            
            profileCtrl.listOfPriSchools = results;
        });
    
    
        /**
         * @name: listOfSecSchools
         * @type: variable
         * @description: provides a list of all the secondary schools in singapore
         */
        
        var secSchoolArray = $firebaseArray(new Firebase(FirebaseUrl + '0'));
        
        secSchoolArray.$loaded(function(results) {
            
            profileCtrl.listOfSecSchools = results;
        });
    
    
        /**
         * @name: updateProfile
         * @type: function
         * @description: update the user profile
         */    
    
        profileCtrl.updateProfile = function() {
            profileCtrl.profile.$save().then(function() {
                $state.go('home');
            });
        };
    
    
        /**
         * @name: submitProfile
         * @type: function
         * @description: submit the user profile
         */    
    
        profileCtrl.submitProfile = function(isValid) {
            
            if(isValid) {
                
                //the profile form is valid
                profileCtrl.profile.profileCompleted = true;
                profileCtrl.profile.$save().then(function () {
                    $state.go('home');
                });
            }
        };
    
    
    });