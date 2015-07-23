var PoistObject = PoistObject || {};

(function() {
    PoistObject.holder = new PoistHolder();
    PoistObject.controller = new PoistController();

    PoistObject.holder.init();

    window.addEventListener('beforeunload', function() {
        PoistObject.holder.save();
    });

})();