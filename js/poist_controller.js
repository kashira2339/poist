var PoistController = function(holder) {
    var poistHolder = holder;

    var container = document.createElement('div');

    var addBtn = document.createElement('button');
    addBtn.innerText = '+';

    addBtn.addEventListener('click', function() {
        var poist = new Poist( window.getSelection().toString());
        poistHolder.add(poist);
    });

    var visibilityCheck = document.createElement('input');
    visibilityCheck.type = 'checkbox';
    visibilityCheck.checked = false;
    poistHolder.setVisible(false);

    visibilityCheck.addEventListener('change', function(e) {
        poistHolder.setVisible(e.target.checked);
    });

    container.classList.add('poist-controller');
    container.appendChild(visibilityCheck);
    container.appendChild(addBtn);

    document.body.appendChild(container);
};