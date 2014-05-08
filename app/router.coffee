Router = Ember.Router.extend
  location: 'auto'

Router.map ->
  @route 'admin'

  @route 'not-found', path: '/*path'

`export default Router`
