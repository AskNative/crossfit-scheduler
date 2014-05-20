var attr = DS.attr;

/**
 * Person model
 *
 * @type {DS.Model}
 */
var Person = DS.Model.extend({
  name:   attr(),
  avatar: attr()
});

export default Person;
