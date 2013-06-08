/*************************
 * Container View Model
 ************************/
(function (lib, undefined) {
  function Container(containername) {
    // properties
    this.name = containername || '';
    this.boxCollection = ko.observableArray();
    this.selectedBox = ko.observable(null);

    // subscription
    this.boxCollection.subscribe(function (newValue) {
      
    });
  }

  Container.prototype.addNewBox = function () {
    var newBox = new lib.Box();
    this.selectedBox(newBox);
    return newBox;
  };

  Container.prototype.editBox = function (requestedBox) {
    if (this.boxCollection().indexOf(requestedBox) >= 0) {
      this.selectedBox(requestedBox);
      return requestedBox;
    }
    return false;
  };

  Container.prototype.doneEditingBox = function () {
    var selectedBox = this.selectedBox();

    if (! selectedBox) {
      throw new Error( {name: "NoBoxSelected", value: "no box selected"} );
    }

    if (this.boxCollection().indexOf(selectedBox) < 0 && selectedBox.valid()) {
      this.boxCollection.push(selectedBox);
      this.selectedBox(null);
    } 

  };

  lib.ContainerViewModel = Container;

}(window.Lib = window.Lib || {}));

/*************
 * Box Model
 ************/
(function (lib, undefined) {
  function Box(boxname) {
    var self = this;
    boxname = typeof boxname !== "undefined" ? boxname : '';
    this.name = ko.observable(boxname);
    this.description = '';
    this.errors = ko.observableArray();
    this.errorsString = ko.computed(function () {
      return self.errors().join();
    });
  }

  Box.prototype.valid = function () {
    this.errors([]);

    if (! this.name().replace(/^\s+|\s+$/g,'')) {
      this.errors.push('Name is a required field');
    }

    if (this.errors().length) {
      return false;
    } else {
      this.errors([]);
    }

    return true;
  };

  lib.Box = Box;

}(window.Lib = window.Lib || {}));

(function() {
  window.generateInitialContent = function() {
    var html;

    html = JST['app/templates/main.us']();
    document.body.innerHTML += html;

    window.vm = new Lib.ContainerViewModel('My Container #1');
    window.setupEvents();
    ko.applyBindings(window.vm);

  };

  window.setupEvents = function () {
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

  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', generateInitialContent, false);
  } else {
    window.attachEvent('load', generateInitialContent);
  }

}).call(this);
