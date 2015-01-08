define(['app/controller'],
    function (Ctl) {

    'use strict';

    return Ctl.extend({

        components: [
            { target: 'title', name: 'title' }
        ],

        index: function (options) {
            var self = this;

            options.ctx = {
                models: {},
                collections: {}
            };

            this.ctx.params.path = 'components/community/views/';

            this.loadModel('content', {
                params: {
                    path: this.ctx.params.path + 'title.json'
                },
                success: function (model) {
                    self.ctx.models.title = model;
                    options.ctx.models.title = model;

                    Ctl.prototype.index.call(self, options);
                },
                error: options.error
            });

        }
    });
});