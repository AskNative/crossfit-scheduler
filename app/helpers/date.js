/**
 * Date Helper
 *
 * @param  {Date} date  Date in ... format. Ex.
 *
 * @return {String}     Date in string format. Ex. Jan 15, 2014
 */
export default function(date) {
  if (date) {
    return moment(date).format("ddd, MMM DD");
  }
}
