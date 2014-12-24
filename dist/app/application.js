define(['lazoApp'], function (LazoApp) {

    'use strict';

    return LazoApp.extend({

        initialize: function (callback) {
            this.addTags();
            this.setDefaultTitle('LazoJS - 100% SEO compliant; single code base; client, server framework with optimized time to render.');
            callback();
        },

        addTags: function () {
            this.addTag('meta', {
                'http-equiv': 'X-UA-Compatible',
                'content': 'IE=edge'
            });
            this.addTag('meta', {
                'name': 'viewport',
                'content': 'width=device-width, initial-scale=1'
            });
        }

    });

});