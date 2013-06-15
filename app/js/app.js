(function() {
  window.app = {};
  window.lib = { viewmodels: {}, models: {} };


  /**
   * Editor Page
   */
  window.editor = window.editor || {};

  window.editor.setupEvents = function () {
    $(document).on('click', '.box-save', function (e) {
      var context = ko.contextFor(this); //this is the element that was clicked
      if (context) {
        context.$root.doneEditingBox(context.$data);
      }
    });

    $(document).on('click', '#cfb_start_add_box', function (e) {
      var context = ko.contextFor(this); //this is the element that was clicked
      if (context) {
        context.$root.addNewBox(context.$data);
      }
    });
  };

  window.editor.init = function() {
    var html;

    html = JST['app/templates/main.us']();
    $('#main_container').append(html);
    window.editor.setupEvents();

    window.app.myContainer = new Lib.ContainerViewModel('My Container #1');
    ko.applyBindings(window.app.myContainer);
  };
}).call(this);