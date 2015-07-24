var PoistController = function() {
    var poistHolder = PoistObject.holder;
    var container = document.createElement('div');
    var addBtn = document.createElement('button');
    var visibilityCheck = document.createElement('input');
    var checkLabel = document.createElement('label');

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

    checkLabel.appendChild(document.createTextNode('表示'));
    checkLabel.appendChild(visibilityCheck);

    container.classList.add('poist-controller');
    container.appendChild(checkLabel);
    container.appendChild(addBtn);

    poistHolder.setVisible(true);

    document.body.appendChild(container);
};