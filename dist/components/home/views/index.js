define(['lazoView', 'moment'], function (LazoView, moment) {

    'use strict';

    return LazoView.extend({

        afterRender: function () {
            var self = this;

            this.$version = this.$('[data-version]');
            this.$downloads = this.$('[data-downloads]');
            this.$update = this.$('[data-update]');

            if (!this.model) {
                this.ctl.loadModel('stats', {
                    success: function (model) {
                        self.ctl.ctx.models.stats = model;
                        self.renderStats();
                    },
                    error: function (err) {
                        LAZO.logger.warn('[home/views/index.js.afterRender] failed to load stats', err);
                    }
                });
            }
        },

        renderStats: function () {
            var model = this.ctl.ctx.models.stats;
            var updatedAgo = moment(model.get('commit').commit.committer.date).fromNow();
            var updateUrl = model.get('commit').html_url;
            var tagUrl = 'https://github.com/lazojs/lazo/releases/tag/v' + model.get('version');

            this.$version.attr('href', tagUrl);
            this.$version.html(model.get('version'));
            this.$downloads.html(model.get('downloads'));
            this.$update.attr('href', updateUrl);
            this.$update.html(updatedAgo);
        }

    });

});