var Poist = Poist || function(text) {
    var _index = PoistObject.holder.size() + 1;

    var _container = document.createElement('div');
    var _header = document.createElement('div');
    var _body = document.createElement('div');
    var _closeBtn = document.createElement('a');

    var _title = 'No Title';
    var _text = text === undefined ? '' : text;
    var _position = {
        x : 10,
        y : 10
    };

    var _size = {
        width : 250,
        height : 100
    };

    _container.draggable = true;
    _container.classList.add('poist-container');

    _header.classList.add('poist-header');
    _body.classList.add('poist-body');

    _closeBtn.innerText = 'CLOSE';

    _closeBtn.addEventListener('click', function() {
        PoistObject.holder.remove(_index);
        removeThis();
    });

    _header.appendChild(_closeBtn);

    _container.appendChild(_header);
    _container.appendChild(_body);

    document.body.appendChild(_container);

    apply();

    _container.addEventListener('dragend', function(e) {
        moveTo(e.clientX + window.scrollX,
               e.clientY + window.scrollY);
    });

    function moveTo(x, y) {
        _position.x = x;
        _position.y = y - _size.height;
        apply();
    }

    function apply() {
        // _header.innerText = _title;
        _body.innerText = _text;
        _container.style.left = _position.x + 'px';
        _container.style.top = _position.y + 'px';
        _container.style.width = _size.width + 'px';
        _container.style.height = _size.height + 'px';
    }

    function removeThis() {
        console.log(_index);
        _container.parentNode.removeChild(_container);
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
        },
        show: function() {
            _container.style.display = 'block';
        },
        hide: function() {
            _container.style.display = 'none';
        },
        remove: function() {
            _container.parentNode.removeChild(_container);
        },
        toJson: function() {
            var obj = {
                title: _title,
                body: _text,
                position: _position,
                size: _size
            };
            return JSON.stringify(obj);
        },
        data: {
            title: _title,
            body: _text,
            position: _position,
            size: _size
        },
        index: _index
    };
};
