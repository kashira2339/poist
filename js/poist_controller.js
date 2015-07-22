var PoistController = function() {
    var poistHolder = new PoistHolder();

    var container = document.createElement('div');

    var addBtn = document.createElement('button');
    addBtn.innerText = '+';

    addBtn.addEventListener('click', function() {
        var poist = new Poist( window.getSelection().toString());
        poistHolder.add(poist);
    });

    window.addEventListener('beforeunload', function() {
        poistHolder.save();
    });

    var visibilityCheck = document.createElement('input');
    visibilityCheck.type = 'checkbox';
    container.classList.add('poist-controller');
    container.appendChild(visibilityCheck);
    container.appendChild(addBtn);

    document.body.appendChild(container);
};



(function() {
    new PoistController();

})();