var attr = DS.attr;

/**
 * Seat model
 *
 * @type {DS.Model}
 */
export default DS.Model.extend({
  date: attr(), // Time in ISO format. Containing day, and time of booking
  user: DS.belongsTo('user'),
});
