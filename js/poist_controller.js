var PoistController = function() {

    var poistHolder = [];

    var container = document.createElement('div');

    var addBtn = document.createElement('button');
    addBtn.innerText = '+';

    addBtn.addEventListener('click', function() {
        var poist = new Poist('No Title', window.getSelection().toString());
        poistHolder.push(poist);
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