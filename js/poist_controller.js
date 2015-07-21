(function(){
    var poist = new Poist('Hello', 'Hello world!!');

    poist.get.addEventListener('dragend', function(e) {
        poist.move(e.clientX+window.scrollX,
                   e.clientY+window.scrollY);
    });

})();