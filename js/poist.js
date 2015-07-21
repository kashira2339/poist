var Poist = Poist || function(title, text) {
    var _container = document.createElement('div');
    var _header = document.createElement('div');
    var _body = document.createElement('div');

    var _title = title === undefined ? '' : title;
    var _text = text === undefined ? '' : text;
    var _position = {
        x : 10,
        y : 10
    };

    var _size = {
        width : 300,
        height : 300
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
        _container.style.left = _position.x + 'px';
        _container.style.top = _position.y + 'px';
        _container.style.width = _size.width + 'px';
        _container.style.height = _size.height + 'px';
    }

    return {
        get: _container,
        size: _size,
        position: _position,
        move: function(x, y) {
            _position.x = x;
            _position.y = y;
            apply();
        },
        resize: function(width, height) {
            _size.width = width;
            _size.height = height;
            apply();
        },
        edit: {
            title : function(str) {},
            text : function(str) {}
        }
    };
};
