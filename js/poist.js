var Poist = Poist || function(custom) {
    var _default = {
        text: '',
        color: '#3498db',
        image: undefined
    };

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
    var _text;
    var _content;
    var _color;
    var _custom = custom || false;

    var _isAnimated = false;
    var _fps = 30; // 30fpsに制限
    var _frameTime = 1000 / _fps;

    if (_custom) {
        _text = _custom.text === undefined ?
                _default.text : custom.text;
        _color = _custom.color === undefined ?
                _default.color : custom.color;
        _content = _custom.image === undefined ?
                _default.image : custom.image;
    }
    
    var _position = {
        x : 10,
        y : 10
    };

    var _size = {
        width : 270,
        height : 80
    };

    /**
     * D&D用 新たに<img>を作成する
     * @param src 画像のbase64エンコード文字列
     */
    function newImage(src) {
        var image = document.createElement('img');
        image.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
        image.src = src === undefined ? '' : src;
        image.width = _size.width;
        image.height = _size.height;
        return image;
    }

    /**
     * D&D用 新たに<video>を作成する
     * @param src 動画のbase64エンコード文字列
     */
    function newVideo(src) {
        var video = document.createElement('video');
        video.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
        video.controls = true;
        video.src = src === undefined ? '' : src;
        video.width = _size.width - 32;
        video.height = _size.height - 8;
        return video;
    }

    /**
     * D&D用 新たに<object>を作成する
     * @param src ソースのbase64エンコード文字列
     */
    function newObject(data) {
        var obj = document.createElement('object');
        obj.addEventListener('dragstart', function(e) {
            e.preventDefault();
        });
        obj.data = data === undefined ? '' : data;
        obj.width = _size.width - 32;
        obj.height = _size.height - 8;
        return obj;
    }

    /**
     * bodyを初期化
     */
    function initBody() {
        _text = '';
        _content = undefined;
        _body.innerText = '';
    }

    /**
     * 付箋の上にimgを置いた時
     * @param file ドロップされたファイルデータ
     * @param func FileReaderのloadイベントで呼ばれる関数
     */
    function putContent(file, func) {
        initBody();
        if(file !== undefined &&
           file.type.indexOf('image/') === 0 ||
           file.type.indexOf('video/') === 0 ||
           file.type.indexOf('application/pdf') === 0) {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', function(e) {
                func(e);
            });
        }
    }

    /**
     * 付箋を浮かせる
     * @param _container 付箋コンテナ
     */
    function float(_container) {
        PoistObject.holder.sinkPoistList();
        _container.classList.add('top-poist');
    }

    /**
     * 付箋を動かす
     * @param x x座標
     * @param y y座標
     */
    function moveTo(x, y) {
        _position.x = x;
        _position.y = y - _size.height;
        apply();
    }

    /**
     * 付箋の大きさを変える
     * @param w 幅
     * @param h 高さ
     */
    function resizeTo(w, h) {
        _size.width = w;
        _size.height = h;
        apply();
    }

    /**
     * 描画
     */
    function draw() {
        if (!_isAnimated) {
            return; 
        }
        _container.style.left = _position.x + 'px';
        _container.style.top = _position.y + 'px';
        _container.style.width = _size.width + 'px';
        _container.style.height = _size.height + 'px';
        setTimeout(draw, _frameTime);
    }

    /**
     * poist内のコンテンツを描きかえる
     */
    function rewrite() {
        try {
            if (_content !== undefined) {
                _text = '';
                if (_content.indexOf('data:image/') === 0) {
                    var img = _body.querySelector('img');
                    if (!!img) {
                        _body.removeChild(_body.querySelector('img'));
                    }
                    _body.appendChild(newImage(_content));
                } else if (_content.indexOf('data:video/') === 0) {
                    var video = _body.querySelector('video');
                    if (!!video) {
                        _body.removeChild(_body.querySelector('video'));
                    }
                    _body.appendChild(newVideo(_content));   
                } else if (_content.indexOf('data:application/pdf') === 0) {
                    var obj = _body.querySelector('object');
                    if (!!obj) {
                        _body.removeChild(_body.querySelector('object'));
                    }
                    _body.appendChild(newObject(_content));   
                }

            } else {
                _body.innerText = _text;
            }
        } catch(e) {
            console.warn('Poistのエラーは無視されました');
        }
    }

    /**
     * 付箋情報の変更を反映する
     */
    function apply() {
        PoistObject.holder.save();
        draw();
        // _container.style.left = _position.x + 'px';
        // _container.style.top = _position.y + 'px';
        // _container.style.width = _size.width + 'px';
        // _container.style.height = _size.height + 'px';
        _container.style.backgroundColor = _color;
        _header.style.backgroundColor = _color;
    }

    /**
     * リサイズ用のポインタ
     */
    _resizePointer.draggable = true;
    _resizePointer.classList.add('poist-resize-pointer');
    _resizePointer.addEventListener('dragstart', function(e) {
        _isAnimated = true;
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
        _isAnimated = false;
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
        rewrite();
    });

    /**
     * bodyEditor 付箋に付属するテキストエリア
     * テキスト編集用
     * ダブルクリックで出現
     */
    _bodyEditor.classList.add('poist-text');
    _bodyEditor.addEventListener('blur', function(e) {
        _text = _bodyEditor.value;
        rewrite();
    });

    /**
     * 付箋の内容部分
     * テキストが保存されている
     */
    _body.classList.add('poist-body');
    _body.addEventListener('dblclick', function() {
        _content = undefined;
        _body.innerText = '';
        _body.appendChild(_bodyEditor);
        _bodyEditor.value = _text;
        _bodyEditor.focus();
    });
    _body.addEventListener('drag', function(e) {
        if (_content !== undefined) {
            e.preventDefault();
        }
    });
    _body.addEventListener('dragover', function(e) {
        e.preventDefault();
        _body.classList.add('poist-body-dragover');
    });
    _body.addEventListener('dragleave', function(e) {
        e.preventDefault();
        _body.classList.remove('poist-body-dragover');
    });
    _body.addEventListener('drop', function(e) {
        e.preventDefault();
        if (e.dataTransfer.files.length === 0) return;
        var file = e.dataTransfer.files[0];
        console.info('poist: filetype ', file.type);
        putContent(file, function(e) {
            if (_content === e.target.result) return;
            initBody();
            _content = e.target.result;
            if (file.type.indexOf('image/') === 0) {
                _body.appendChild(newImage(e.target.result));
            } else if (file.type.indexOf('video/') === 0) {
                _body.appendChild(newVideo(e.target.result));
            } else if (file.type.indexOf('application/pdf') === 0) {
                _body.appendChild(newObject(e.target.result));
            } 
        });
    });

    /**
     * 閉じるボタン
     * 付箋を消す
     */
    _closeBtn.classList.add('close-btn');
    _closeBtn.innerText = '×';
    _closeBtn.addEventListener('click', function() {
        PoistObject.holder.remove(_index);
        _container.parentNode.removeChild(_container);
    });

    /**
     * 付箋のヘッダー
     * 閉じるボタンを持つ
     */
    _header.classList.add('poist-header');
    _header.appendChild(_closeBtn);

    /**
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
    _container.addEventListener('dragstart', function(e) {
        _isAnimated = true;
    });
    _container.addEventListener('dragend', function(e) {
        if (_isResizing) return;
        _isAnimated = true;
        moveTo(e.clientX + window.scrollX,
               e.clientY + window.scrollY);
    });
    _container.addEventListener('click', function(e) {
        resizeTo(
            _size.width,
            _size.height
        );
        float(_container);
    });

    return {
        move: function(x, y) {
            _position.x = x;
            _position.y = y;
        },
        resize: function(width, height) {
            _size.width = width;
            _size.height = height;
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
                image: _content,
                color: _color,
                position: _position,
                size: _size
            };
        },
        create: function() {
            /*
             * 付箋をページに追加
             */
            document.body.appendChild(_container);
            /*
             * 反映
             */
            _isAnimated = true;
            apply();
            _isAnimated = false;
            rewrite();
        }
    };
};
