'use strict';

// Define the `googleMaps` service
angular.module('googleMaps')
    .factory('googleMapsService', [function () {
        var googleMapsFactory = {};
        var directionsService = new google.maps.DirectionsService;
        var googleMapsServiceBase = 'https://maps.googleapis.com/maps/api/staticmap?size=500x400&maptype=roadmap';

        googleMapsFactory.optimizeWaypoints = function (cityFrom, cityTo, waypoints, callback) {
            var orderedWaypoints = [];

            directionsService.route({
                origin: cityFrom + ', Украина',
                destination: cityTo + ', Украина',
                travelMode: google.maps.TravelMode.DRIVING,
                waypoints: waypoints ,
                optimizeWaypoints: true
            }, function (response) {
                if (response != null) {
                    response.routes[0].waypoint_order.map((order) => orderedWaypoints.push(waypoints[order]));
                };

                callback({response: response, waypoints: orderedWaypoints});
            });
        }

        googleMapsFactory.getGoogleMapsImage = function (cityFrom, cityTo, waypoints, polyline, callback) {
            //generate static maps url with direction polyline
            var url = googleMapsServiceBase.concat(
                googleMapsFactory.covertWaypointsToUrlParams(cityFrom, cityTo, waypoints),
                '&path=color:0x0000ff80|weight:5|enc:', polyline,
                '&key=AIzaSyASESgz77PHOJYW_GWrEa4eAJPlMXeua5Q');

            //convert image to base64
            googleMapsFactory.convertImgToDataURL(url, callback);
        }

        googleMapsFactory.covertWaypointsToUrlParams = function (cityFrom, cityTo, waypoints) {
            var urlParams = '';

            //variable to avoid js locking
            var getUrlParam = function (location, color) {
                color = color ? color : 'green';

                return '&markers=color:' + color + '|' + location;
            };

            urlParams += getUrlParam(cityFrom);
            waypoints.map((waypoint) => urlParams += getUrlParam(waypoint.location));
            urlParams += getUrlParam(cityTo, 'red');

            return urlParams;
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