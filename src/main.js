/**
 * Entry file for the Vue waterfall component
 */
import Waterfall from './Waterfall'

// expose the interface for the host app to install
Waterfall.install = (Vue, opts) => {
  // expose the services for the plugin to use
  Vue.component(Waterfall.name, Waterfall)
};

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use(Waterfall, {}); // install the plugin; refer to the global variable
}
