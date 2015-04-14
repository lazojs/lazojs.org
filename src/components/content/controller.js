define(['app/controller', 'text!./views/partials/main.hbs'],
    function (Ctl, mainPartial) {

    'use strict';

    var Handlebars = LAZO.app.getTemplateEngine('handlebars').engine;
    var views = {
        guide: true,
        api: true
    };

    return Ctl.extend({

        components: [
            { target: 'sidebar', name: 'sidebar' },
            { target: 'title', name: 'title' }
        ],

        index: function (options) {
            var self = this;
            var topic = this.ctx.params.topic;

            function success() {
                self.registerPartials(function () {
                    Ctl.prototype.index.call(self, options);
                });
            }

            this.view = views[topic] ? (topic + '/index') : 'index';
            this.ctx.params.path = 'components/content/views/' +
                (views[topic] ? (this.ctx.params.topic + '/') : '/');

            this.loadCollection('content', {
                params: {
                    path: this.ctx.params.path + 'sidebar.json'
                },
                success: function (collection) {
                    self.ctx.collections.sidebar = collection;
                    success();
                },
                error: options.error
            });
        },

        registerPartials: function (callback) {
            var topics = this.ctx.collections.sidebar.toJSON();
            var subTopics = [];
            var partials = [];
            var self = this;

            Handlebars.registerPartial('main', mainPartial);
            Handlebars.registerHelper('partial', function (name, context, opt) {
                name = name.replace(/\//g, '_');
                var f = Handlebars.partials[name];
                if (!f) {
                    return "Partial not loaded";
                }
                if (!_.isFunction(f)) {
                    f = Handlebars.compile(f);
                }

                return new Handlebars.SafeString(f(context));
            });

            for (var i = 0; i < topics.length; i++) {
                if (topics[i].items) {
                    subTopics = subTopics.concat(topics[i].items);
                }
            }

            for (var j = 0; j < subTopics.length; j++) {
                partials.push('text!components/content/views/' + this.ctx.params.topic + '/partials/' + subTopics[j].link + '.hbs');
            }

            LAZO.require(partials, function () {
                var partials = [].slice.call(arguments);
                for (var i = 0; i < partials.length; i++) {
                    Handlebars.registerPartial(subTopics[i].link, partials[i]);
                }
                callback();
            }, function (err) {
                LAZO.logger.error();
                self.view = 'error';
                callback();
            });
        }

    });

});