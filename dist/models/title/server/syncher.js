define(['lazoSyncher'], function (LazoSyncher) {

    'use strict';

    return LazoSyncher.extend({

        fetch: function (options) {
            LAZO.require(['json!' + options.params.path + 'title.json'], function (title) {
                options.success(title);
            }, function () {
                options.success([]);
            });
        }

    });

});
