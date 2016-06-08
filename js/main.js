import PoistHolder from './PoistHolder';
import Poist       from './Poist';
import '../css/main.scss';

(function() {
  const holder = new PoistHolder();

  for (let i=0, list=holder.poistList; i < list.length; i=(i+1)|0) {
    console.log(list[i]);
  }

  const poist = new Poist({});
  console.log(poist);
  holder.add(poist);
  
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    let poist = new Poist({});
    console.log(poist);
    holder.add(poist);
  });
  
  window.addEventListener('contextmenu', function(e) {
    console.log(e);
  });
  const onmessage = function(msg, sender, sendResponse) {
    console.log(msg);
  };
  chrome.runtime.onMessage.addListener(onmessage);    
})();
