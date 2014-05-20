Router = Ember.Router.extend
  location: ENV.locationType

Router.map ->
  @route 'admin'
  @route 'auth'

  @route 'not-found', path: '/*path'

`export default Router`
