(function(){

    var x;
    var y;
    var relativeX;
    var relativeY;

    var poist = new Poist('Hello', 'Hello world!!');

    var isDragging = false;

    poist.get.addEventListener('dragstart', function(e) {
        relativeX = e.x - poist.position.x;
        relativeY = e.y - poist.position.y;
        isDragging = true;
    });

    poist.get.addEventListener('dragend', function(e) {
        poist.move(e.clientX+window.scrollX, e.clientY+window.scrollY);
        isDragging = false;
    });

    poist.get.addEventListener('mousemove', function(e) {
        if (isDragging) {
            poist.move(e.x, e.y);
        }
    });
})();