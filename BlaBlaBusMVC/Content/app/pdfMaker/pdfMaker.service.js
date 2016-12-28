'use strict';

// Register `pdfMaker` component, along with its associated controller and template
angular.
    module('pdfMaker').
    factory('PdfMaker', function() {
        return {
            createAndDownload: function(options) {
                pdfMake.createPdf(options.docDefinition).download(options.fileName ? options.fileName : 'file.pdf');
            },
            createAndOpen: function(options) {
                pdfMake.createPdf(options.docDefinition).open();
            }
        }
    });