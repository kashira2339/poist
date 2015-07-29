var Poist = Poist || function(text) {
    var _index = PoistObject.holder.size() + 1;
    var _isResizing = false;
    var _mouseStart = {
        x: 0,
        y: 0
    };

    var _container = document.createElement('div');
    var _header = document.createElement('div');
    var _body = document.createElement('pre');
    var _closeBtn = document.createElement('a');
    var _bodyEditor = document.createElement('textarea');
    var _resizePointer = document.createElement('div');

    var _title = 'No Title';
    var _text = text === undefined ? '' : text;
    var _position = {
        x : 10,
        y : 10
    };

    var _size = {
        width : 270,
        height : 80
    };

    /*
     * 付箋を浮かせる
     */
    function float(_container) {
        PoistObject.holder.sinkPoistList();
        _container.classList.add('top-poist');
    }

    /*
     * 付箋を動かす
     */
    function moveTo(x, y) {
        _position.x = x;
        _position.y = y - _size.height;
        apply();
    }

    /*
     * 付箋の大きさを変える
     */
    function resizeTo(x, y) {
        _size.width = x;
        _size.height = y;
        apply();
    }

    /*
     * 付箋情報の変更を反映する
     */
    function apply() {
        PoistObject.holder.save();
        _container.style.left = _position.x + 'px';
        _container.style.top = _position.y + 'px';
        _container.style.width = _size.width + 'px';
        _container.style.height = _size.height + 'px';
        try {
            _body.innerText = _text;
        } catch(e) {
            console.warn('Poistのエラーは無視されました');
        }
    }

    /*
     * リサイズ用のポインタ
     */
    _resizePointer.draggable = true;
    _resizePointer.classList.add('poist-resize-pointer');
    _resizePointer.addEventListener('dragstart', function(e) {
        _mouseStart.x = e.clientX;
        _mouseStart.y = e.clientY;
        _isResizing = true;
    });
    _resizePointer.addEventListener('drag', function(e) {
        var x = e.clientX - _mouseStart.x;
        var y = e.clientY - _mouseStart.y;
        if (x === 0 || y === 0) {
            return;
        }
        resizeTo(
            _size.width + x,
            _size.height + y
        );
        _mouseStart.x = e.clientX;
        _mouseStart.y = e.clientY;
    });
    _resizePointer.addEventListener('dragend', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var x = e.clientX - _mouseStart.x;
        var y = e.clientY - _mouseStart.y;
        resizeTo(
            _size.width + x < 70 ? 70 : _size.width + x + 8,
            _size.height + y < 30 ? 30 : _size.height + y - 8
        );
        _mouseStart.x = 0;
        _mouseStart.y = 0;
        _isResizing = false;
    });

    /*
     * bodyEditor 付箋に付属するテキストエリア
     * テキスト編集用
     * ダブルクリックで出現
     */
    _bodyEditor.classList.add('poist-text');
    _bodyEditor.addEventListener('blur', function(e) {
        _text = _bodyEditor.value;
        apply();
    });

    /*
     * 付箋の内容部分
     * テキストが保存されている
     */
    _body.classList.add('poist-body');
    _body.addEventListener('dblclick', function() {
        _body.innerText = '';
        _body.appendChild(_bodyEditor);
        _bodyEditor.value = _text;
        _bodyEditor.focus();
    });

    /*
     * 閉じるボタン
     * 付箋を消す
     */
    _closeBtn.classList.add('close-btn');
    _closeBtn.innerText = '×';
    _closeBtn.addEventListener('click', function() {
        PoistObject.holder.remove(_index);
        _container.parentNode.removeChild(_container);
    });

    /*
     * 付箋のヘッダー
     * 閉じるボタンを持つ
     */
    _header.classList.add('poist-header');
    _header.appendChild(_closeBtn);

    /*
     * 付箋そのもの・コンテナ
     * ドラッグで持ち運べる
     * クリックした付箋が最前面にくる
     */
    _container.draggable = true;
    _container.classList.add('poist-container');
    _container.classList.add('clear-fix');
    _container.appendChild(_header);
    _container.appendChild(_body);
    _container.appendChild(_resizePointer);
    _container.addEventListener('dragend', function(e) {
        if (_isResizing) return;
        moveTo(e.clientX + window.scrollX,
               e.clientY + window.scrollY);
    });
    _container.addEventListener('click', function(e) {
        resizeTo(
            _size.width,
            _size.height
        );
        float(e.target);
    });

    /*
     * 付箋をページに追加
     */
    document.body.appendChild(_container);

    /*
     * 反映
     */
    apply();

    return {
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
        show: function() {
            _container.style.display = 'block';
        },
        hide: function() {
            _container.style.display = 'none';
        },
        remove: function() {
            _container.parentNode.removeChild(_container);
        },
        sink: function() {
            _container.classList.remove('top-poist');
        },
        data: function() {
            return {
                title: _title,
                body: _text,
                position: _position,
                size: _size
            };
        }
    };
};
