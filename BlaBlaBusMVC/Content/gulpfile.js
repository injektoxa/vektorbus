﻿var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');

//The order of loading files is important!!!
gulp.task('scripts', function () {
    return gulp.src([
        'app/bower_components/jquery/dist/jquery.js',
        'app/bower_components/angular/angular.js',
        'app/bower_components/angular-animate/angular-animate.js',
        'app/bower_components/angular-resource/angular-resource.js',
        'app/bower_components/angular-route/angular-route.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap.js',
        'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'app/bower_components/angular-sanitize/angular-sanitize.js',
        'app/bower_components/angular-google-places-autocomplete/src/autocomplete.js',
        'app/bower_components/pdfmake/build/pdfmake.js',
        'app/bower_components/pdfmake/build/vfs_fonts.js',
        'app/app.module.js',
        'app/app.config.js',
        'app/app.animations.js',
        'app/core/core.module.js',
        'app/core/checkmark/checkmark.filter.js',
        'app/core/client/client.module.js',
        'app/core/client/client.service.js',
        'app/core/clientTrip/clientTrip.module.js',
        'app/core/clientTrip/clientTrip.service.js',
        'app/core/trip/trip.module.js',
        'app/core/trip/trip.service.js',
        'app/core/driver/driver.module.js',
        'app/core/driver/driver.service.js',
        'app/core/bus/bus.module.js',
        'app/core/bus/bus.service.js',
        'app/core/city/city.module.js',
        'app/core/city/city.service.js',
        'app/core/agent/agent.module.js',
        'app/core/agent/agent.service.js',
        'app/core/agentReport/agentReport.module.js',
        'app/core/agentReport/agentReport..service.js',
        'app/core/driverReport/driverReport.module.js',
        'app/core/driverReport/driverReport.service.js',
        'app/clientTrip-list/clientTrip-list.module.js',
        'app/clientTrip-list/clientTrip-list.component.js',
        'app/client-detail/client-detail.module.js',
        'app/client-detail/client-detail.component.js',
        'app/trip-list/trip-list.module.js',
        'app/trip-list/trip-list.component.js',
        'app/driver-list/driver-list.module.js',
        'app/driver-list/driver-list.component.js',
        'app/driver-list/driver-crud/driver-crud.module.js',
        'app/driver-list/driver-crud/driver-crud.component.js',
        'app/bus-list/modal/modalBus.module.js',
        'app/bus-list/modal/modalBus.component.js',
        'app/bus-list/bus-list.module.js',
        'app/bus-list/bus-list.component.js',
        'app/agent-list/agent-list.module.js',
        'app/agent-list/agent-list.component.js',
        'app/agent-list/modal/modalAgent.module.js',
        'app/agent-list/modal/modalAgent.component.js',
        'app/reports/reports.module.js',
        'app/reports/agent-reports.component.js',
        'app/reports/driver-reports.component.js',
        'app/client-list/client-list.module.js',
        'app/client-list/client-list.component.js',
        'app/client-list/modal/modalClient.module.js',
        'app/client-list/modal/modalClient.component.js',
        'app/client-list/modal/modalClientTrips.component.js',
        'app/cities-list/cities-list.module.js',
        'app/cities-list/cities-list.component.js',
        'app/pdfMaker/pdfMaker.module.js',
        'app/pdfMaker/pdfMaker.service.js'
    ], {base: 'app/'})
      .pipe(sourcemaps.init())
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app'));
});

gulp.task('styles', function () {
    return gulp.src([
        'app/bower_components/bootstrap/dist/css/bootstrap.css',
        'app/app.css',
        'app/app.animations.css',
        'app/bower_components/angular-google-places-autocomplete/src/autocomplete.css'
    ], { base: 'app/' })
      .pipe(sourcemaps.init())
      .pipe(concat('all.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('app'));
});

gulp.task('fonts', function () {
    return gulp.src([
        'app/bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}'
    ])
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./fonts/'));
});

gulp.task('default', ['scripts', 'styles', 'fonts']);