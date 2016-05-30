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
    contexts: ['page', 'selection'],
    'id': POIST_ADD_PARENT_ID
  });

  chrome.contextMenus.create({
    title: 'Blue',
    parentId: POIST_ADD_PARENT_ID,
    id: POIST_ADD_PARENT_ID + '-blue',
    contexts: ['page', 'selection'],
    onclick: function () {
      chrome.tabs.query ({ active: true }, function(tab){
        chrome.tabs.sendMessage(tab[0].id, '#3498db', function(response) {
          console.log(response.hoge);
        });
      });
    }
  });
  
})();
