var IndexDurationController = Ember.ObjectController.extend({
  needs: ['index/day'],
  // day: Ember.computed.alias('controller.index/day'),
  // postsDetails: Ember.computed.alias('controllers.posts/details')

  dayBinding: 'parentController',
  // @get 'parentController.showCitiesLink'

  /**
   * Total number of spots to resurve
   * @type {Number}
   */
  maxSpots: 12,

  /**
   * Calculates spots left/avaiable to be resurved
   * @return {Number} Spots available to be resurved
   */
  spotsLeftCount: (function() {
    var peopleCount = this.get('people.length') || 0;
    var maxSpots    = this.get('maxSpots');

    return maxSpots - peopleCount;
  }).property('people', 'people.length'),

  /**
   * Shows spots left if spots left is low (ex: 3 seats left)
   * @return {String} Text indicating spots left
   */
  spotsLeft: (function() {
    var spotsLeft = this.get('spotsLeftCount');

    if (spotsLeft <= 3) {
      var append = '';

      if (spotsLeft === 1) {
        append = 'Spot left';
      } else {
        append = 'Spots left';
      }

      return spotsLeft + ' ' + append;
    }
  }).property('spotsLeftCount'),

  actions: {
    new: function(id, dayId) {
      window.console.log(this.get('parentController.day'));
      window.console.log(this.get('day'));
      window.console.log('Insert item here', id, dayId);
    }
  }
});

export default IndexDurationController;
