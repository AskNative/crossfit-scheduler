Router = Ember.Router.extend
  location: ENV.locationType

Router.map ->
  @route 'admin'

  @route 'not-found', path: '/*path'

`export default Router`
