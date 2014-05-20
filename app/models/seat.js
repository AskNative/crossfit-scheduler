var attr = DS.attr;

/**
 * Seat model
 *
 * @type {DS.Model}
 */
export default DS.Model.extend({
  date: attr(), // Unix time. Containing day, and time of booking
  person: DS.belongsTo('person'),
});
