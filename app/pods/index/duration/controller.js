/**
 * IndexDuration Controller
 *
 * @type {ObjectController}
 */
var IndexDurationController = Ember.ObjectController.extend({
  needs: ['index'],

  /**
   * Binds parent model with parentController model
   *
   * @type {Model}
   */
  parentModelBinding: 'parentController.model.content',

  /**
   * Extracts time from current duration
   *
   * @return {String} Hour of the day as 7:00
   */
  from: (function() {
    return moment(this.get('content')).format('hh:mm');
  }).property('content'),

  /**
   * Extracts time from current duration and add +1 hour
   *
   * @return {String} Hour of the day as 7:00
   */
  to: (function() {
    return moment(this.get('content')).add('h', 1).format('hh:mm');
  }).property('content'),

  /**
   * Extracts time type as am/pm from current duration
   *
   * @return {String} Period of the day as am/pm
   */
  type: (function() {
    return moment(this.get('content')).format('a');
  }).property('content'),

  /**
   * Total number of spots to resurve
   *
   * @type {Number}
   */
  maxSpots: 12,

  /**
   * Calculates spots left/avaiable to be resurved
   *
   * @return {Number} Spots available to be resurved
   */
  spotsLeftCount: (function() {
    var peopleCount = this.get('people.length') || 0;
    var maxSpots    = this.get('maxSpots');

    return maxSpots - peopleCount;
  }).property('people', 'people.length'),

  /**
   * Shows spots left if spots left is low (ex: 3 seats left)
   *
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

  /**
   * Seats
   *
   * @return {Array} Array of seats with people who reserved it
   */
  seats: (function() {
    var seats       = this.get('parentModel');
    var currentDay  = this.get('content');

    return seats.filter(function(seat) {
      var date = seat.get('date');

      return  moment(date).isSame(currentDay, 'day') &&
              moment(date).isSame(currentDay, 'time');
    });
  }).property('parentModel.@each.time'),

  actions: {
    /**
     * Reserver the current user a spot in the selected schedule
     *
     * @param  {Object} duration
     */
    new: function(duration) {
      var store       = this.store;
      var seats       = this.get('parentModel');
      var currentDay  = this.get('content');

      // Find person and create record after
      store.find('person', '-JNJ4t6I95pc5nYnyqXx').then(function(me) {

        // Delete existing records on the same day
        var seatsExisting = seats.filter(function(seat) {
          var date = seat.get('date');
          var person = seat.get('person');

          console.log(person.id, me.id);

          return  moment(date).isSame(currentDay, 'day') &&
                  person.id === me.id;
        });

        seatsExisting.invoke('deleteRecord');
        seatsExisting.invoke('save');

        // Create new seat
        var newSeat = store.createRecord('seat', {
          date:   duration,
          person: me
        });

        newSeat.save().then(function(data) {
          console.log('success', data);
        }, function(reason) {
          console.log('failed', reason);
        });
      });
    }
  },
});

export default IndexDurationController;
