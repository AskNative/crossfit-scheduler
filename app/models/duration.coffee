###*
 * Duration Model
###

attr = DS.attr

Duration = DS.Model.extend(
  from: attr()
  to:   attr()
  type: attr()
)

`export default Duration`
