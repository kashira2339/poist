(function() {
    var holder = new PoistHolder();
    var controller = new PoistController(holder);

    window.addEventListener('beforeunload', function() {
        poistHolder.save();
    });

})();