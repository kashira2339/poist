(function() {
    var POIST_ADD_PARENT_ID = 'add-poist';
    var menu = menu || {};
    menu.add = {};
    menu.add.colors = {
        Blue: '#3498db',
        Pink: '#ff00ff',
        Green: '#2ecc71',
        Yellow: '#f1c40f',
        Red: '#e74c3c'
    };

    chrome.contextMenus.create({
        'title': 'Poistを追加',
        'id': POIST_ADD_PARENT_ID
    });

    chrome.contextMenus.create({
        title: 'Blue',
        parentId: POIST_ADD_PARENT_ID,
        id: POIST_ADD_PARENT_ID + '-blue',
        contexts: ['page', 'selection'],
        onclick: function () {
            chrome.tabs.query ({
                active: true
            }, function(tab){
                chrome.tabs.sendMessage(
                    tab[0].id,
                    menu.add.colors.Blue,
                    function(response) {
                        console.log(response.hoge);
                    }
                );
            });
        }
    });

    chrome.contextMenus.create({
        title: 'Pink',
        parentId: POIST_ADD_PARENT_ID,
        id: POIST_ADD_PARENT_ID + '-pink',
        contexts: ['page', 'selection'],
        onclick: function () {
            chrome.tabs.query ({
                active: true
            }, function(tab){
                chrome.tabs.sendMessage(
                    tab[0].id,
                    menu.add.colors.Pink,
                    function(response) {
                        console.log(response.hoge);
                    }
                );
            });
        }
    });

    chrome.contextMenus.create({
        title: 'Green',
        parentId: POIST_ADD_PARENT_ID,
        id: POIST_ADD_PARENT_ID + '-green',
        contexts: ['page', 'selection'],
        onclick: function () {
            chrome.tabs.query ({
                active: true
            }, function(tab){
                chrome.tabs.sendMessage(
                    tab[0].id,
                    menu.add.colors.Green,
                    function(response) {
                        console.log(response.hoge);
                    }
                );
            });
        }
    });

    chrome.contextMenus.create({
        title: 'Yellow',
        parentId: POIST_ADD_PARENT_ID,
        id: POIST_ADD_PARENT_ID + '-yellow',
        contexts: ['page', 'selection'],
        onclick: function () {
            chrome.tabs.query ({
                active: true
            }, function(tab){
                chrome.tabs.sendMessage(
                    tab[0].id,
                    menu.add.colors.Yellow,
                    function(response) {
                        console.log(response.hoge);
                    }
                );
            });
        }
    });

    chrome.contextMenus.create({
        title: 'Red',
        parentId: POIST_ADD_PARENT_ID,
        id: POIST_ADD_PARENT_ID + '-red',
        contexts: ['page', 'selection'],
        onclick: function () {
            chrome.tabs.query ({
                active: true
            }, function(tab){
                chrome.tabs.sendMessage(
                    tab[0].id,
                    menu.add.colors.Red,
                    function(response) {
                        console.log(response.hoge);
                    }
                );
            });
        }
    });

})();
