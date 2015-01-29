define(['lazoView', 'jquery'], function (LazoView, $) {

    'use strict';

    return LazoView.extend({

        events: {
            'click .navbar-nav a': 'navigate'
        },

        afterRender: function () {
            var self = this;
            var $doc = $(document);
            this.setActiveLink();
            $(window).on('scroll', function (e) {
                self.$('.navbar')[$doc.scrollTop() > 0 ? 'addClass' : 'removeClass']('scrolling');
            });
        },

        navigate: function (e) {
            var self = this;

            this.setActiveLink($(e.currentTarget).closest('li'));
            LAZO.app.on('navigate:application:begin', function () {
                self.setActiveLink($(e.currentTarget).closest('li'));
            });
        },

        setActiveLink: function ($el) {
            this.$('.navbar-nav li').removeClass('active');
            if (window.location.pathname !== '/') {
                var pathname = window.location.pathname.split('/');
                $el = $el || this.$('.navbar-nav a[href*="/' + pathname[1] + '"]').closest('li');
                $el.addClass('active');
            }
        },

        onRemove: function () {
            $(window).off('scroll');
        }

    });

});