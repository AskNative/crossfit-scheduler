var attr = DS.attr;

/**
 * User model
 *
 * @type {DS.Model}
 */
export default DS.Model.extend({
  name:    attr(),
  email:   attr(),
  avatar:  attr(),
});
