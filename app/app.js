import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

import dateHelper from './helpers/date';

Ember.Handlebars.registerBoundHelper('date', dateHelper);

Ember.MODEL_FACTORY_INJECTIONS = true;

// Sepcifies app version number for Ember Debugger
Ember.libraries.register('App', '0.0.1');

var App = Ember.Application.extend({
  modulePrefix: 'crossfit-scheduler',
  podModulePrefix: 'crossfit-scheduler/pods',
  Resolver: Resolver
});

loadInitializers(App, 'crossfit-scheduler');

export default App;
