import Vue   from 'vue';
import Poist from './poist.vue';

const PoistParent = new Vue({
  el: 'body',
  components: {
    Poist
  }
});
const app = new PoistParent({});
PoistParent.$appendTo(document.body);
