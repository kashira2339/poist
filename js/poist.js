var poist = postit || function(title, text) {

    var _title = title === 'undefined' ? '' : title;
    var _text = text === 'undefined' ? '' : text;
    var _position = {
        x : 0,
        y : 0
    };

    var _size = {
        width : 0,
        height : 0
    };

    return {
        resize : function(x, y) {},
        edit : {
            title : function(str) {},
            text : function(str) {}
        },
    };

}(title, text);