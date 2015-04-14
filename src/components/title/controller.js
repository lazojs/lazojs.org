define(['app/controller'], function (Ctl) {

    'use strict';

    return Ctl.extend({

        index: function (options) {
            var self = this;
            this.loadModel('content', {
                params: {
                    path: self.ctx.params.path + 'title.json'
                },
                success: function (model) {
                    self.ctx.models.title = model;
                    Ctl.prototype.index.call(self, options);
                },
                error: options.error
            });
        }

    });

});