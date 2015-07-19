var Poist = Poist || function(title, text) {

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

}(title, text);