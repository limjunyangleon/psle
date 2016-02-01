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
         * @name: compatibilityChildStrength
         * @type: variable
         * @description: provides the schools compatible to child strength
         */
        
        homeCtrl.compatibilityChildStrength = [
            "NAN HUA SECONDARY",
            "ST JOSEPH INSTITUTION",
            "RAFFLES INSTITUTION"
        ];
    
    
        /**
         * @name: ccaVariety
         * @type: variable
         * @description: provides the schools with the most compatible cca
         */
        
        homeCtrl.cca = [
            "BEATTY SECONDARY",
            "ST JOSEPH INSTITUTION",
            "RAFFLES INSTITUTION"
        ];
    
    
        /**
         * @name: distanceFromHome
         * @type: variable
         * @description: provides the schools with nearest distance from home
         */
        
        homeCtrl.distanceFromHome = [
            "HOLY INNOCENT",
            "ST JOSEPH INSTITUTION",
            "RAFFLES INSTITUTION"
        ];
    
        
        /**
         * @name: acdemicProgrammes
         * @type: variable
         * @description: provides the schools with most compatible academic programmes
         */
        
        homeCtrl.acdemicProgrammes = [
            "PASIR RIS SECONDARY",
            "ST JOSEPH INSTITUTION",
            "RAFFLES INSTITUTION"
        ];
    
    
        /**
         * @name: schoolCulture
         * @type: variable
         * @description: provides the schools with most compatible school culture
         */
        
        homeCtrl.schoolCulture = [
            "CEDAR GIRLS",
            "ST MAGAREATS SECONDARY",
            "CLEMENTI TOWN SECONDARY"
        ];
    
    
        /**
         * @name: schoolReputation
         * @type: variable
         * @description: provides the schools with the best school reputation
         */
        
        homeCtrl.schoolReputation = [
            "HUA YI SECONDARY",
            "ANGLO CHINESE INDEPENDENT",
            "RAFFLES INSTITUTION"
        ];
    
    
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
                    homeCtrl.answer = "";
                });
            });
        }
        
        
        /**
         * @name: promptAlert
         * @description: informs user that the function has not been implemented yet
         */
        
        homeCtrl.promptAlert = function () {
            alert("Sorry, this feature has not been implemented in our beta version :(");
        }
    
    
    });