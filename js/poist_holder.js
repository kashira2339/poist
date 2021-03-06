var PoistHolder = function() {
    var LOCAL_STORAGE_KEY = 'poist-data';
    // Poistオブジェクトを保存するリスト
    var poistList = [];
    var isFirst = true;

    /*
     * poistListをjsonに変換
     */
    function _toJson() {
        var map = {};
        map.data = [];
        _loopList(function(i, list) {
            map.data.push(!!list[i] ? poistList[i].data() || {} : {});
        }, poistList);
        return JSON.stringify(map);
    }

    /*
     * ローカルストレージにjsonを保存
     */
    function _save() {
        localStorage.setItem(LOCAL_STORAGE_KEY, _toJson());
    }

    /*
     * 反復処理を請け負うメソッド
     */
    function _loopList(func, list) {
        for (var i = 0, len = list.length; i < len; i++)  {
            func(i, list);
        }
    }

    return {
        /*
         * 初期化関数 最初に実行する
         */
        init: function() {
            if (!isFirst) {
                return;
            }
            var json = localStorage.getItem(LOCAL_STORAGE_KEY);
            var obj = JSON.parse(json);
            if (!obj) {
                return;
            }
            var data = obj.data || [];
            _loopList(function(i, d) {
                if(Object.keys(d[i]).length === 0) {
                    return;
                }
                var poist = new Poist({
                    text: d[i].body,
                    color: d[i].color,
                    image: d[i].image
                });
                poist.move(d[i].position.x, d[i].position.y);
                poist.resize(d[i].size.width, d[i].size.height);
                poist.create();
                poistList.push(poist);
            }, data);
            isFirst = false;
        },
        add: function(elm) {
            poistList.push(elm);
            _save();
        },
        remove: function(index) {
            delete poistList[index - 1];
            _save();
        },
        size: function() {
            return poistList.length;
        },
        save: function() {
            _save();
        },
        setVisible: function(bool) {
            _loopList(function(i, list) {
                list[i][bool ? 'show' : 'hide']();
            }, poistList);
        },
        sinkPoistList: function() {
            _loopList(function(i, list) {
                if(!!list[i]) {
                    list[i].sink();
                }
            }, poistList);
        }
    };
};

PoistObject.holder = new PoistHolder();