define(['lazoCollectionView', 'jquery'], function (LazoCollectionView, $) {

    'use strict';

    return LazoCollectionView.extend({

        collection: 'sidebar',

        itemView: 'item',

        afterRender: function(){

            // Have sidebar scroll with user
            this.$('.lazo-sidebar').affix({
                offset: {
                    top: 115,
                    bottom: 90
                }
            });

            // Auto select based on current view
            $('body').scrollspy({
                target: '.lazo-sidebar',
                offset: 100
            });
        }

    });

});