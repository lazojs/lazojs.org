define(['lazoSyncher', 'underscore'], function (LazoSyncher, _) {

    'use strict';

    var expires = 3600000;
    var ts = 0;
    var cache = {};
    var urls = [
        'https://registry.npmjs.org/lazo/latest',
        'https://api.npmjs.org/downloads/point/last-month/lazo',
        'https://api.github.com/repos/lazojs/lazo/commits'
    ];

    return LazoSyncher.extend({

        fetch: function (options) {
            var expected = urls.length;
            var fetched = 0;
            var self = this;

            // if (((new Date()).getTime() - ts) < expires) {
            //     return options.success(cache);
            // }

            urls.forEach(function (url) {
                self.proxy.get(url, {
                    headers: {
                        'User-Agent': 'lazojs.org'
                    },
                    error: options.error,
                    success: function (resp) {
                        ts = (new Date()).getTime();
                        fetched++;

                        switch (url) {
                            case 'https://registry.npmjs.org/lazo/latest':
                                cache.version = resp.version;
                                break;
                            case 'https://api.npmjs.org/downloads/point/last-month/lazo':
                                cache.downloads = resp.downloads;
                                break;
                            case 'https://api.github.com/repos/lazojs/lazo/commits':
                                cache.commit = resp[0];
                                break;
                        }

                        if (fetched === expected) {
console.log(cache);
                            options.success(cache);
                        }
                    }
                });
            });

        }

    });

});