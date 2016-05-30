import PoistHolder from './PoistHolder';
import Poist       from './Poist';
import '../css/main.scss';

(function() {
  // var dropResource = {
  //   A: '',
  //   '#text': '',
  //   IMG: ''
  // };

  const holder = new PoistHolder();

  for (let i=0, list=holder.poistList; i < list.length; i=(i+1)|0) {
    console.log(list[i]);
  }

  let poist = new Poist({});
  console.log(poist);
  holder.add(poist);
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    let poist = new Poist({});
    console.log(poist);
    holder.add(poist);
  }
                                      );
  window.addEventListener('contextmenu', function(e) {
    console.log(e);
  });
  const onmessage = function(msg, sender, sendResponse) {
    console.log(msg);
  };
  chrome.runtime.onMessage.addListener(onmessage);    
})(); 
// chrome.runtime.onMessage.addListener(
//   function(msg, sender, sendResponse) {
/**
 *
 * TODO Poistを作成する
 *
 */
// var poist = new Poist({
//   text: window.getSelection().toString(),
//   color: msg
// });
// poist.move(x + window.scrollX,
//            y + window.scrollY);
// poist.create();
// PoistObject.holder.add(poist);
//   }
// );
// window.addEventListener('contextmenu', function(e) {
// console.log(e);
// x = e.x;
// y = e.y;
// });
// document.body.addEventListener('dragstart', function(e) {
//   e.dataTransfer.setData('text/plain', e.target.data);
// });
// window.addEventListener('beforeunload', function() {
// poistを保存する
// PoistObject.holder.save();
//   });
// })();
