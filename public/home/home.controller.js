/**
 * @name: home controller
 * @description: process the logic for the home page
 */

angular.module('psleApp')

    .controller('HomeCtrl', function (Auth, $state, $firebaseArray, FirebaseUrl, profile) {
        
        var homeCtrl = this;
    
        homeCtrl.profile = profile; 
    
    
        /**
         * @name: qns
         * @type: variable
         * @description: provides the current question to the user
         */    
    
        var questionArray = $firebaseArray(new Firebase(FirebaseUrl + '2'));
    
        questionArray.$loaded(function(results) {
            homeCtrl.qns = results[homeCtrl.profile.currentQuestion];
        });
    
    
        /**
         * @name: logout
         * @description: allows users to logout of the application
         */
        
        homeCtrl.logout = function () {
            Auth.$unauth();
            $state.go('login');
        }
        
        
        /**
         * @name: submitAnswer
         * @description: allows users to submit their daily questions
         */
        
        homeCtrl.submitAnswer = function () {
            homeCtrl.profile["question" + homeCtrl.qns.number] = homeCtrl.answer;
            homeCtrl.profile.currentQuestion = homeCtrl.profile.currentQuestion + 1;
            
            homeCtrl.profile.$save().then(function() {
                questionArray.$loaded(function(results) {
                    homeCtrl.qns = results[homeCtrl.profile.currentQuestion];
                });
            });
        }
    
    
    });