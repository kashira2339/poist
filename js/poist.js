var Poist = Poist || function(title, text) {
    var _container = document.createElement('div');
    var _header = document.createElement('div');
    var _body = document.createElement('div');

    var _title = title === undefined ? '' : title;
    var _text = text === undefined ? '' : text;
    var _position = {
        x : 0,
        y : 0
    };

    var _size = {
        width : 0,
        height : 0
    };

    _container.draggable = true;
    _container.classList.add('poist-container');
    _header.classList.add('poist-header');
    _body.classList.add('poist-body');

    _container.appendChild(_header);
    _container.appendChild(_body);

    document.body.appendChild(_container);

    apply();

    function apply() {
        _header.innerText = _title;
        _body.innerText = _text;
        _container.style.left = _position.x;
        _container.style.top = _position.y;
        _container.style.width = _size.width;
        _container.style.height = _size.height;
    }

    return {
        get: _container,
        move: function(x, y) {
            _position.x = x + 'px';
            _position.y = y + 'px';
            apply();
        },
        resize: function(width, height) {
            _size.width = width + 'px';
            _size.height = height + 'px';
            apply();
        },
        edit: {
            title : function(str) {},
            text : function(str) {}
        }
    };
};
