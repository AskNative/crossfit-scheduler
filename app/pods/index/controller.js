/**
 * Day object
 *
 * @type {Object}
 */
var Day = Ember.Object.extend({
  date:      null,
  durations: []
});

/**
 * Index Controller
 *
 * @type {ArrayController}
 */
var IndexController = Ember.ArrayController.extend({
  title: 'Crossfit-Stars Box Schedule',

  /**
   * @property {Person} currentUser Currently logged in user
   * @default null
   */
  currentUser: null,

  /**
   * @property {Firebase} dbRef Firebase instance
   */
  dbRef: new Firebase(ENV.APP.FIREBASE_URL),

  /**
   * Creates an array of days with durations for each day
   *
   * @return {Array[Object]} Array of day object with duration in each day
   */
  days: (function() {
    var days = [];

    for (var i = 1; i < 4; i++) {
      var date = moment().add('d', i);

      days.pushObject(Day.create({
        date: date,
        durations: [
          date.set('h', 7).minutes(0).seconds(0).milliseconds(0).toISOString(),
          date.set('h', 8).minutes(0).seconds(0).milliseconds(0).toISOString(),
          date.set('h', 19).minutes(0).seconds(0).milliseconds(0).toISOString(),
          date.set('h', 20).minutes(0).seconds(0).milliseconds(0).toISOString(),
          date.set('h', 21).minutes(0).seconds(0).milliseconds(0).toISOString(),
        ]
      }));
    }

    return days;
  }).property(),

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
      var append = (spotsLeft === 1) ? 'Spot left' : 'Spots left' ;

      return spotsLeft + ' ' + append;
    }
  }).property('spotsLeftCount'),

  /**
   * @method authenticationWithFacebook
   * @return {Promise} Returns a promsie that resolves with newly created user
   */
  authenticationWithFacebook: function() {
    var dbRef = this.get('dbRef');

    var promise = new Ember.RSVP.Promise(function(resolve, reject) {
      var auth = new FirebaseSimpleLogin(dbRef, function(error, user) {
        if (user) {
          console.log('User is', user);
          resolve(user);
        } else if (error) {
          console.log('Failed to login here', error);
          reject(error);
        }
      });

      auth.login('facebook', {
        rememberMe: true,
        scope: 'email'
      });

    });

    return promise;
  },

  actions: {
    /**
     * Login using facebook
     *
     * @method login
     */
    login: function() {
      var self  = this;
      var store = this.store;

      // Login with existing user or create new account
      this.authenticationWithFacebook().then(function(user) {
        var userAvatar = 'http://graph.facebook.com/' + user.id + '/picture?type=large';

        store.find('user', user.id).then(function(existingUser) {
          console.log(existingUser);
          existingUser.setProperties({
            name:   user.displayName,
            email:  user.thirdPartyUserData.email,
            avatar: userAvatar,
          });

          existingUser.save().then(function(value) {
            self.set('currentUser', value);
          });

        }, function() {

          var newUser= store.createRecord('user', {
            id:      user.id,
            name:    user.displayName,
            email:   user.thirdPartyUserData.email,
            avatar:  userAvatar,
          });

          newUser.save().then(function(value) {
            self.set('currentUser', value);
          });
        });
      });
    }
  }
});

export default IndexController;
