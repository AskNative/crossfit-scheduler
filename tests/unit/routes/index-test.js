import { test, moduleFor } from 'ember-qunit';

moduleFor('route:index', 'Unit - IndexRoute', {
  // only neccessary if you want to load other items into the runtime
  // needs: ['controller:index']
  setup: function () {},
  teardown: function () {}
});

test("it exists", function(){
  ok(this.subject());
});
