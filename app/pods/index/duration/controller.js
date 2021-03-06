/**
 * IndexDuration Controller
 *
 * @type {ObjectController}
 */
var IndexDurationController = Ember.ObjectController.extend({
  needs: ['index'],

  /**
   * @property parentModel
   * @type {Model}
   */
  parentModelBinding: 'parentController.model.content',

  currentUserBinding: 'parentController.currentUser',
  /**
   * @property {String} from Hour of the day as 7:00
   */
  from: (function() {
    return moment(this.get('content')).format('hh:mm');
  }).property('content'),

  /**
   * @property {String} to Hour of the day as 7:00
   */
  to: (function() {
    return moment(this.get('content')).add('h', 1).format('hh:mm');
  }).property('content'),

  /**
   * @property {String} type Period of the day as am/pm
   */
  type: (function() {
    return moment(this.get('content')).format('a');
  }).property('content'),

  /**
   * @property {Boolean} isMorning Computed property that returns true if duration is am
   */
  isMorning: Ember.computed.equal('type', 'am'),

  /**
   * @property {Number} maxSpots Total number of spots to resurve
   */
  maxSpots: 12,

  /**
   * @property {Number} spotsLeftCount Spots available to be resurved
   */
  spotsLeftCount: (function() {
    var peopleCount = this.get('people.length') || 0;
    var maxSpots    = this.get('maxSpots');

    return maxSpots - peopleCount;
  }).property('people', 'people.length'),

  /**
   * @property {String} spotsLeft Text indicating spots left if running out
   *                              (ex: 3 seats left)
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
   * @property {Array} seats Array of seats with people who reserved it
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

  /**
   * Delete existing records on the same day
   *
   * @method deleteExistingRecords
   * @param  {User} me Model for the user to look for
   */
  deleteExistingRecords: function(me) {
    var seats       = this.get('parentModel');
    var currentDay  = this.get('content');

    var seatsExisting = seats.filter(function(seat) {
      var date = seat.get('date');
      var user = seat.get('user');

      return  moment(date).isSame(currentDay, 'day') &&
              user.id === me.id;
    });

    seatsExisting.invoke('deleteRecord');
    seatsExisting.invoke('save');
  },

  actions: {
    /**
     * Reserver the current user a spot in the selected schedule
     *
     * @method new
     * @param  {Object} duration
     */
    new: function(duration) {
      var self        = this;
      var store       = this.store;
      var currentUser = this.get('currentUser');

      // Find user and create record after
      store.find('user', currentUser.id).then(function(me) {
        self.deleteExistingRecords(me);

        store.createRecord('seat', {
          date: duration,
          user: me
        }).save();
      });
    }
  },
});

export default IndexDurationController;
