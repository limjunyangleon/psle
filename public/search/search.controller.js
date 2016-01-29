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
    
    
    function pause(milliseconds) {
        var dt = new Date();
        while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
    }
    
    var index = 0;
    
    uiGmapGoogleMapApi.then(function (maps) {
        // geocode chosen town
        var schoolList = $firebaseArray(new Firebase(FirebaseUrl + '0'));
        
        schoolList.$loaded(function(result) {
            
            angular.forEach(result,function(school) {
                
                searchCtrl.randomMarkers.push({
                    id: school.$id,
                    latitude: school.lat,
                    longitude: school.lng
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


});