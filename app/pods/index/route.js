export default Ember.Route.extend({
  model: function() {
    this.store.push('day', {
      id: 1,
      date: 'Thu, 8 May',
      durations: [{
        id: 1,
        from: '7:00',
        to:   '8:00',
        type: 'am',
        people: [{
          name: 'Foo'
        }, {
          name: 'Doo'
        }, {
          name: 'Crew'
        }]
      },
      {
        id: 2,
        from: '8:00',
        to:   '9:00',
        type: 'am',
        people: [{
          name: 'Foo'
        }, {
          name: 'Crew'
        }]
      }]
    });

    this.store.push('day', {
      id: 2,
      date: 'Fri, 9 May',
      durations: [{
        id: 1,
        from: '7:00',
        to:   '8:00',
        type: 'am',
        people: [{
          name: 'Foo'
        }, {
          name: 'Doo'
        }, {
          name: 'Crew'
        }]
      },
      {
        id: 2,
        from: '8:00',
        to:   '9:00',
        type: 'am',
        people: [{
          name: 'Foo'
        }, {
          name: 'Doo'
        }, {
          name: 'Crew'
        }]
      }]
    });

    this.store.push('day', {
      id: 3,
      date: 'Sat, 10 May',
      durations: [{
        id: 1,
        from: '7:00',
        to:   '8:00',
        type: 'am',
        people: [{
          name: 'Doo'
        }, {
          name: 'Crew'
        }]
      },
      {
        id: 2,
        from: '8:00',
        to:   '9:00',
        type: 'am',
        people: []
      }]
    });

    return this.store.all('day');
  },

  setupController: function(controller, model) {
    controller.set('content', model);
  }
});
