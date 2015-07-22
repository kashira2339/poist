var PoistHolder = function() {
    var LOCAL_STORAGE_KEY = 'poist-data';
    var poistList = [];

    function _toJson() {
        var map = {};
        map.data = [];
        for (var i = 0, len = poistList.length; i < len; i++)  {
            map.data.push(poistList[i].data);
        }
        return JSON.stringify(map);
    }

    function _save() {
        localStorage.setItem(LOCAL_STORAGE_KEY, _toJson());
    }

    return {
        add: function(elm) {
            poistList.push(elm);
            _save();
        },
        remove: function(index) {
            poistList.splice(index, 1);
            _save();
        }
    };
};

var PoistController = function() {
    var poistHolder = new PoistHolder();

    var container = document.createElement('div');

    var addBtn = document.createElement('button');
    addBtn.innerText = '+';

    addBtn.addEventListener('click', function() {
        var poist = new Poist('No Title', window.getSelection().toString());
        poistHolder.add(poist);
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