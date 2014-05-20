/**
 * Index Route
 *
 * @type {Route}
 */
export default Ember.Route.extend({
  model: function() {
    return this.store.find('seat');
  },

  // setupController: function(controller, model) {
  //   controller.set('content', model);
  // }
});
