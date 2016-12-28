'use strict';

angular.module('driverCrud')
  .component('driverCrud',
  {
    templateUrl: 'driver-list/driver-crud/driver-crud.template.html',
    controller: [
      'Driver', '$scope', function (Driver, $scope) {
        var that = this;
        this.maxPhotoWidth = 150;
        this.maxPhotoHeight = 150;
        this.driver = {};

        this.cancel = function () {
          $scope.$parent.$ctrl.showAddDriverBlock();
        };

        this.save = function (driver) {
          that.driver = driver;
          if (driver.Id > 0) {
            Driver.update({ id: driver.Id },
              driver,
              function (editedDriver) {
                $scope.$parent.$ctrl.showAddDriverBlock();
                that.driver = {};
              });
          } else {
            Driver.add(driver,
              function onSuccess(createdDriver) {
                $scope.$parent.$ctrl.drivers.push(createdDriver);
                $scope.$parent.$ctrl.showAddDriverBlock();
                that.driver = {};
              });
          }
        };

        this.deleteDriver = function (id) {
          Driver.delete({ id: id },
            function onSuccess(deletedDriver) {
              var index = $scope.$parent.$ctrl.drivers.map(function(e) { return e.Id }).indexOf(deletedDriver.Id);
              if (index > -1) {
                $scope.$parent.$ctrl.drivers.splice(index, 1);
              }
            }
          );
        };

        $scope.$on('deleteDriverEvent',
          function(event, params) {
            that.deleteDriver(params.id);
          }
        );

        $scope.$on('editDriverEvent',
          function (event, params) {
            that.driver = params.driver;
            $("#photoPreview").attr("src", 'data:image/png;base64,' + that.driver.Photo);
            $scope.$parent.$ctrl.showAddDriverBlock();
          }
        );

        this.resizeBase64Img = function (base64Img, maxWidth, maxHeight) {
            var canvas = document.createElement("canvas");
            var deferred = $.Deferred();

            $("<img/>").attr("src", base64Img).load( function () {
                var width = this.width;
                var height = this.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                var context = canvas.getContext("2d");
                context.drawImage(this, 0, 0, width, height);
                deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));
            });
            return deferred.promise();
        }

        $("#driverPhoto").change(function () {
            if (this.files && this.files[0]) {
                var fr = new FileReader();
                fr.onload = function (e) {
                    that.resizeBase64Img(e.target.result, that.maxPhotoWidth, that.maxPhotoHeight)
                        .then(function (newImg) {
                            that.driver.Photo = newImg[0].src.replace('data:image/png;base64,', '');
                            console.log(newImg[0].src);
                            $("#photoPreview").attr("src", newImg[0].src);
                        }
                    );
                };
                fr.readAsDataURL(this.files[0]);
            }
        });
      }
    ]
  });