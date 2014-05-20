var attr = DS.attr;

/**
 * Seat model
 *
 * @type {DS.Model}
 */
var Seat = DS.Model.extend({
  date: attr(), // Unix time. Containing day, and time of booking
  person: DS.belongsTo('person'),
});

export default Seat;
