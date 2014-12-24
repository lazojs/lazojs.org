define(['app/controller'], function (Ctl) {

    return Ctl.extend({

        components: [
            { target: 'header', name: 'header' },
            { target: 'footer', name: 'footer' }
        ]

    });

});