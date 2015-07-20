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

    _container.classList.add('poist-container');
    _header.classList.add('poist-header');
    _body.classList.add('poist-body');

    _container.appendChild(_header);
    _container.appendChild(_body);
    _header.appendChild(document.createTextNode(_title));
    _body.appendChild(document.createTextNode(_text));

    document.body.appendChild(_container);

    return {
        move : function(x, y) {},
        resize : function(width, height) {},
        edit : {
            title : function(str) {},
            text : function(str) {}
        },
        apply : function() {

        }
    };
};

(function() {
    var poist = new Poist('hoge', 'fuga');
})();