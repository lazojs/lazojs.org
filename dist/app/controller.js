define(['lazoCtl', 'underscore'], function (LazoCtl, _) {

    return LazoCtl.extend({

        view: 'index',

        components: [],

        index: function (options) {
            if (this.components.length) {
                return this.loadChildren(options);
            }

            options.success(this.view);
        },

        loadChildren: function (options) {
            var counter = 0;
            var self = this;
            var components = this.components;
            var expected = components.length;

            function error(err) {
                options.error(err);
            }
            function success(child) {
                counter++;
                if (counter === expected) {
                    options.success(self.view);
                }
            }

            for (var i = 0; i < expected; i++) {
                this.addChild(components[i].target, components[i].name, {
                    error: error,
                    success: success,
                    ctx: _.extend({
                        params: this.ctx.params
                    }, options.ctx)
                });
            }
        }

    });

});