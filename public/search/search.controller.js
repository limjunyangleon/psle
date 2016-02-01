/**
 * @name: search controller
 * @description: process the logic for the search school page
 */

angular.module('psleApp')

.controller('SearchCtrl', function ($timeout, uiGmapGoogleMapApi, $scope, $rootScope, $firebaseArray, FirebaseUrl) {

    var searchCtrl = this;
    
    // geocode the given address
    searchCtrl.geocodeAddress = function (address, callback) {
        console.log(address);
    
        searchCtrl.geo = new google.maps.Geocoder();
        searchCtrl.geo.geocode({
            address: address
        }, function (results, status) {
            
            console.log("IN");
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            } else {
                
                if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                    
                    pause(100);
                    console.log("OVER LIMIT");
                }
                
                console.log("Geocode was not successful for the following reason: " + status);
            }
        }, function() {
            console.log('some error');
        });
    };


    searchCtrl.map = {
        center: {
            latitude: 1.348551,
            longitude: 103.837778
        },
        zoom: 12,
        icon: {url: '../img/school_icon.png'}
    };
    
    searchCtrl.randomMarkers = [];
    searchCtrl.markers = [];
    searchCtrl.googlemap = {};
    
    
    function pause(milliseconds) {
        var dt = new Date();
        while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
    }
    
    var index = 0;
    
    uiGmapGoogleMapApi.then(function (maps) {
        
        var schoolList = $firebaseArray(new Firebase(FirebaseUrl + '0'));
        
        schoolList.$loaded(function(result) {
            
            angular.forEach(result,function(school) {
                
                searchCtrl.randomMarkers.push({
                    id: school.$id,
                    sch: school.school,
                    latitude: school.lat,
                    longitude: school.lng,
                    showMarker: false,
                    /*events: {
                        click: function(e){
                            var windows = searchCtrl.googlemap.getChildWindows();

                            for (var i = 0; i < windows.length; i++){
                                windows[i].hideWindow();
                            }
                        }
                    },*/
                    control: {}
                });
                
                /*setTimeout(function() {
                    
                    searchCtrl.geocodeAddress(school.postal_code.toString(), function (latLng) {

                        searchCtrl.markers.push({
                                id: school.$id,
                                latitude: latLng.lat(),
                                longitude: latLng.lng()

                        });
                        
                        var saveId = parseInt(school.$id);
                        schoolList[saveId].lat = latLng.lat();
                        schoolList[saveId].lng = latLng.lng();
                        schoolList.$save(saveId);
                        
                        searchCtrl.randomMarkers = searchCtrl.markers;

                    });
                    
                }, index * 1000)
                
                index++;*/
            });
            
            //searchCtrl.randomMarkers = searchCtrl.markers;

        });

    });
    
    searchCtrl.clicking = function(marker, eventName, model) {
        console.log(marker);
        console.log(eventName);
        console.log(model);
    };
    
    
    /**
     * @name: listOfSecSchools
     * @type: variable
     * @description: provides a list of all the secondary schools in singapore
     */
        
    var secSchoolArray = $firebaseArray(new Firebase(FirebaseUrl + '0'));

    secSchoolArray.$loaded(function(results) {

        searchCtrl.listOfSecSchools = results;
    });
    
    
    /**
     * @name: areaOfSchool
     * @type: variable
     * @description: provides the area of school
     */

    searchCtrl.areaOfSchool = [
        "North",
        "South",
        "East",
        "West",
        "Central"
    ];
    
    
    /**
     * @name: ratingsOfSchool
     * @type: variable
     * @description: provides the ratings of school
     */

    searchCtrl.ratingsOfSchool = [
        "1 Star",
        "2 Stars",
        "3 Stars",
        "4 Stars",
        "5 Stars"
    ];
    
    
    /**
     * @name: entryPointRange
     * @type: variable
     * @description: provides the entry point range of schools
     */

    searchCtrl.entryPointRange = [
        "< 100",
        "101 - 120",
        "121 - 140",
        "141 - 160",
        "161 - 180",
        "181 - 200",
        "201 - 220",
        "221 - 240",
        "241 - 260",
        "261 - 280",
        "281 - 300"
    ];
    
    
    /**
     * @name: typesOfSchool
     * @type: variable
     * @description: provides the types of schools
     */

    searchCtrl.typesOfSchool = [
        "Integrated Programme (IP)",
        "Independent Schools",
        "Autonomous Schools",
        "Special Assistant Plan Schools"
    ];
    
    
    /**
     * @name: hmtOffered
     * @type: variable
     * @description: provides the hmt offered by schools
     */

    searchCtrl.hmtOffered = [
        "Higher Chinese Language",
        "Higher Malay Language",
        "Higher Tamil Language",
        "Chinese (Special Programme)",
        "Malay (Special Programme)"
    ];
    
    
    /**
     * @name: promptAlert
     * @description: informs user that the function has not been implemented yet
     */

    searchCtrl.promptAlert = function () {
        alert("Sorry, this feature has not been implemented in our beta version :(");
    }


});