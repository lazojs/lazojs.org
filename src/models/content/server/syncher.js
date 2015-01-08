define(['lazoSyncher'], function (LazoSyncher) {

    'use strict';

    return LazoSyncher.extend({

        fetch: function (options) {
            LAZO.require(['json!' + options.params.path], function (content) {
                options.success(content);
            }, function () {
                options.success([]);
            });
        }

    });

});
