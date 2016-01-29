/**
 * @name: profile controller
 * @description: process the logic for profiling
 */

angular.module('psleApp')

    .controller('ProfileCtrl', function (Auth, $state, $http) {
        
        var profileCtrl = this;
    
    
        //profileCtrl.profile = profile;
        
        profileCtrl.updateProfile = function() {
            profileCtrl.profile.$save().then(function() {
                $state.go('home');
            });
        };
    
        
        profileCtrl.listOfPrimaryYears = [
            'Primary 1',
            'Primary 2',
            'Primary 3',
            'Primary 4',
            'Primary 5',
            'Primary 6',
        ];
        
        profileCtrl.listOfGenders = [
            'Male',
            'Female'
        ]
        
    
        /**
         * @name: getListOfPrimarySchools
         * @description: get a list of all the primary schools in singapore
         */
    
    
        profileCtrl.getListOfPrimarySchools = function() {
         
            $http.get("https://data.gov.sg/api/3/action/resource_show?id=dcd83e83-c956-4749-ae4c-96d4486d0925")
                .then(function(result) {
                    console.log(result);
                    profileCtrl.listOfPrimarySchools = result.data.result.records;
                }, function(error) {
                    console.log("Error getting list of primay schools");
                });
            
        }
        
        profileCtrl.getListOfPrimarySchools();
    
    
    });