import startApp from '../helpers/start-app';

var App;

module('Acceptances - Index', {
  setup: function() {
    App = startApp();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
  }
});

test('index renders', function() {

  visit('/').then(function() {
    var title = find('h2#title');
    var list = find('ul li');

    equal(title.text(), 'Welcome ayohal-Crossfit-ter');
  });

});
