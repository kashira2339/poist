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
        poist.move(e.x, e.y);
        relativeX = 0;
        relativeY = 0;
        isDragging = false;
    });

})();