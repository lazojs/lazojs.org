define(['app/controller'], function (Ctl) {

    'use strict';

    return Ctl.extend({

        index: function (options) {
            var self = this;
            this.loadCollection('content', {
                params: {
                    path: this.ctx.params.path + 'sidebar.json'
                },
                success: function (collection) {
                    self.ctx.collections.sidebar = collection;
                    Ctl.prototype.index.call(self, options);
                },
                error: options.error
            });
        }

    });

});