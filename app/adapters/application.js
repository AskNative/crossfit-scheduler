export default DS.FirebaseAdapter.extend({
  firebase: new Firebase(ENV.APP.FIREBASE_URL)
});
