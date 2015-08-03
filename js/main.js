var PoistObject = PoistObject || {};

(function() {
    PoistObject.holder = new PoistHolder();
    PoistObject.controller = new PoistController();
    PoistObject.holder.init();
    chrome.runtime.onMessage.addListener(
        function(msg, sender, sendResponse) {
            var poist = new Poist(window.getSelection().toString()); 
            PoistObject.holder.add(poist);
        }
    );
    window.addEventListener('beforeunload', function() {
        PoistObject.holder.save();
    });

})();