(function(){
    var poist = new Poist('Hello', 'Hello world!!');

    var isDragging = false;

    poist.get.addEventListener('dragstart', function(e) {
        isDragging = true;
    });

    poist.get.addEventListener('dragend', function(e) {
        isDragging = false;
    });

    document.body.addEventListener('mousemove', function(e) {
    });

})();