var attr = DS.attr;

/**
 * Person model
 *
 * @type {DS.Model}
 */
export default DS.Model.extend({
  name:   attr(),
  avatar: attr()
});
