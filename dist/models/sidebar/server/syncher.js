define(['lazoSyncher'], function (LazoSyncher) {

    'use strict';

    return LazoSyncher.extend({

        fetch: function (options) {
            LAZO.require(['json!' + options.params.sidebar + 'sidebar.json'], function (sidebar) {
                options.success(sidebar);
            }, function (err) {
                options.success([]);
            });
        }

    });

});
