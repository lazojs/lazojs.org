define(['lazoView'], function (LazoView) {

    'use strict';

    return LazoView.extend({

        events: {
            'click .navbar-nav a': 'navigate'
        },

        afterRender: function () {
            var self = this;
            this.setActiveLink();
        },

        navigate: function (e) {
            var self = this;

            this.$('.navbar-nav li').removeClass('active');
            this.setActiveLink($(e.currentTarget).closest('li'));
            LAZO.app.on('navigate:application:begin', function () {
                this.setActiveLink($(e.currentTarget).closest('li'));
            });
        },

        setActiveLink: function ($el) {
            if (window.location.pathname !== '/') {
                $el = $el || this.$('.navbar-nav a[href*="' + window.location.pathname + '"]').closest('li');
                $el.addClass('active');
            }
        }

    });

});