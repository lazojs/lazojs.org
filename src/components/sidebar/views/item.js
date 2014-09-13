define(['lazoView', 'jquery'], function (LazoView, $) {

    'use strict';

    return LazoView.extend({

        tagName: 'li',

        events: {
            'click a': 'scroll'
        },

        scroll: function (e) {
            var $target = $(e.currentTarget);
            var name = $target.attr('href').split('#')[1];
            var $scrollTo = $('a[name="' + name + '"]');

            e.preventDefault();
            // scroll to anchor minus fixed header height
            $('html, body').animate({ scrollTop: $scrollTo.offset().top - 50 });
        }

    });

});