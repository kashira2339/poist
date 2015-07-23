var PoistController = function() {
    var poistHolder = PoistObject.holder;
    var container = document.createElement('div');
    var addBtn = document.createElement('button');
    var visibilityCheck = document.createElement('input');

    addBtn.innerText = '+';
    addBtn.addEventListener('click', function() {
        var poist = new Poist( window.getSelection().toString());
        poistHolder.add(poist);
    });

    visibilityCheck.type = 'checkbox';
    visibilityCheck.checked = true;
    visibilityCheck.addEventListener('change', function(e) {
        poistHolder.setVisible(e.target.checked);
    });

    container.classList.add('poist-controller');
    container.appendChild(visibilityCheck);
    container.appendChild(addBtn);

    poistHolder.setVisible(true);

    document.body.appendChild(container);
};