(function() {
    var POIST_CONTEXT_MENU_ID = '';
    chrome.contextMenus.create({
        id: POIST_CONTEXT_MENU_ID,
        title: 'Poistを追加',
        contexts: ['page', 'selection'],
        onclick: function () {
            chrome.tabs.query ({
                active: true
            }, function(tab){
                chrome.tabs.sendMessage(
                    tab[0].id,
                    'hoge',
                    function(response) {
                        console.log(response.hoge);
                    });
            });
        }
    });
})();
