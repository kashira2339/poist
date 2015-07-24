var Poist = Poist || function(text) {
    console.time('hoge');
    var _index = PoistObject.holder.size() + 1;

    var _container = document.createElement('div');
    var _header = document.createElement('div');
    var _body = document.createElement('div');
    var _closeBtn = document.createElement('a');
    var _bodyEditor = document.createElement('textarea');

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
     * 付箋情報の変更を反映する
     */
    function apply() {
        _body.innerText = _text;
        _container.style.left = _position.x + 'px';
        _container.style.top = _position.y + 'px';
        _container.style.width = _size.width + 'px';
        _container.style.height = _size.height + 'px';
        PoistObject.holder.save();
    }

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
    _container.addEventListener('dragstart', function(e) {
        float(e.target);
    });
    _container.addEventListener('dragend', function(e) {
        moveTo(e.clientX + window.scrollX,
               e.clientY + window.scrollY);
    });
    _container.addEventListener('click', function(e) {
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

    console.timeEnd('hoge');

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
