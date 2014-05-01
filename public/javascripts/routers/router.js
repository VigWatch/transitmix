app.Router = Backbone.Router.extend({
  routes: {
    'new': 'new',
    'lines/new': 'new',
    'lines/:id': 'line',
    '*default': 'home'
  },

  initialize: function(options) {
    this.collection = options.collection;
  },

  line: function(id) {
    l = new app.Line({ id: id });
    l.fetch({ success: _.bind(this.collection.focus, this.collection) });
  },

  new: function() {
    var line = new app.Line();
    var collection = this.collection;

    var success = function(model) {
      app.router.navigate('lines/' + model.id);
      collection.focus(model);
    };

    line.save({}, { success: success });
  },

  home: function() {
    this.collection.fetch({
      reset: true,
      data: { per: 10 },
      success: _.bind(this.collection.blur, this.collection),
      error: function(model, error) {
        console.log(model, error)
      },
    });
  },
});
