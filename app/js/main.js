/*************************
 * Container View Model
 ************************/
(function (lib, undefined) {
  function ContainerViewModel(containername) {
    // properties
    this.name = containername || '';
    this.boxCollection = ko.observableArray();
    this.selectedBox = ko.observable(null);

    // subscription
    this.boxCollection.subscribe(function (newValue) {

    });
  }

  ko.utils.extend(ContainerViewModel.prototype, {
    addNewBox: function () {
      var newBox = new lib.Box();
      this.selectedBox(newBox);
      return newBox;
    },
    editBox: function (requestedBox) {
      if (this.boxCollection().indexOf(requestedBox) >= 0) {
        this.selectedBox(requestedBox);
        return requestedBox;
      }
      return false;
    },
    doneEditingBox: function () {
      var selectedBox = this.selectedBox();
      if (! selectedBox) {
        throw new Error( {name: "NoBoxSelected", value: "no box selected"} );
      }
      if (this.boxCollection().indexOf(selectedBox) < 0 && selectedBox.valid()) {
        this.boxCollection.push(selectedBox);
        this.selectedBox(null);
      }
    }
  });

  lib.ContainerViewModel = ContainerViewModel;

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
