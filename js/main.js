var PoistObject = PoistObject || {};

(function() {
    var dropResource = {
        A: '',
        '#text': '',
        IMG: ''
    };

    var x;
    var y;
    PoistObject.holder.init();
    chrome.runtime.onMessage.addListener(
        function(msg, sender, sendResponse) {
            var poist = new Poist({
                text: window.getSelection().toString(),
                color: msg
            });
            poist.move(x + window.scrollX,
                       y + window.scrollY);
            poist.create();
            PoistObject.holder.add(poist);
        }
    );
    window.addEventListener('contextmenu', function(e) {
        console.log(e);
        x = e.x;
        y = e.y;
    });
    document.body.addEventListener('dragstart', function(e) {
        e.dataTransfer.setData('text/plain', e.target.data);
    });
    window.addEventListener('beforeunload', function() {
        PoistObject.holder.save();
    });
})();