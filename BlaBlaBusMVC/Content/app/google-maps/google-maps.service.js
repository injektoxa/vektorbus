'use strict';

// Define the `googleMaps` service
angular.module('googleMaps')
    .factory('googleMapsService', ['$http', '$q',
        function ($http, $q) {
            var googleMapsFactory = {};
            var directionsService = new google.maps.DirectionsService;
            var googleMapsServiceBase = 'https://maps.googleapis.com/maps/api/staticmap?size=500x400&zoom=7&maptype=roadmap';

            googleMapsFactory.getGoogleMapsImage = function (cityFrom, cityTo, callback) {
                //getting direction json for access direction polyline
                directionsService.route({
                    origin: cityFrom,
                    destination: cityTo,
                    travelMode: google.maps.TravelMode.DRIVING
                }, function (response) {
                    //generate static maps url with direction polyline
                    var url = googleMapsServiceBase.concat(
                        '&markers=color:green|label:A|', cityFrom, '&markers=color:red|label:B|', cityTo,
                        '&path=color:0x0000ff80|weight:5|enc:', response.routes[0].overview_polyline, '&key=AIzaSyBkEIsxJ1ZqsEBPUYsef_jF2ajuSkmbxJ4');

                    //convert image to base64
                    googleMapsFactory.convertImgToDataURL(url, callback);
                });
            }

            googleMapsFactory.convertImgToDataURL = function (url, callback) {
                var img = new Image();
                img.crossOrigin = 'Anonymous';

                img.onload = function () {
                    var canvas = document.createElement('CANVAS');
                    var ctx = canvas.getContext('2d');
                    var dataURL;

                    canvas.height = this.height;
                    canvas.width = this.width;
                    ctx.drawImage(this, 0, 0);

                    dataURL = canvas.toDataURL();
                    callback(dataURL);

                    canvas = null;
                };

                img.src = url;
            }

            return googleMapsFactory;
        }]);