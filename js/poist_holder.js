var PoistHolder = function() {
    var LOCAL_STORAGE_KEY = 'poist-data';
    var poistList = [];

    function _toJson() {
        var map = {};
        map.data = [];
        for (var i = 0, len = poistList.length; i < len; i++)  {
            (function(i) {
                if(poistList[i] === undefined) {
                    map.data.push({});
                } else {
                    map.data.push(poistList[i].data() || {});
                }
            })(i);
        }
        return JSON.stringify(map);
    }

    function _save() {
        localStorage.setItem(LOCAL_STORAGE_KEY, _toJson());
    }

    function _load() {
        var json = localStorage.getItem(LOCAL_STORAGE_KEY);
        var data = JSON.parse(json).data || [];
        for (var i = 0, len = data.length; i < len; i++)  {
            (function(i, d) {
                if(Object.keys(d[i]).length === 0) {
                    return;
                }
                var poist = new Poist(d[i].body);
                poist.move(d[i].position.x, d[i].position.y);
                poist.resize(d[i].size.width, d[i].size.height);
                poistList.push(poist);
            })(i, data);
        }
    }

    return {
        init: function() {
            _load();
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
            for (var i = 0, len = poistList.length; i < len; i++)  {
                (function(i) {
                    poistList[i][bool ? 'show' : 'hide']();
                })(i);
            }
        },
        sinkPoistList: function() {
            for (var i = 0, len = poistList.length; i < len; i++)  {
                (function(i) {
                    poistList[i].sink();
                })(i);
            }
        }
    };
};