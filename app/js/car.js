(function (lib, undefined) {

  function Car (data) {
    var self = this;

    self.name = '';
    self.wheel = ko.observable();
    self.maxSpeed = ko.observable();
    self.changed = ko.observable(false);
    self.update(data);

    self.distancePerLitre = ko.computed(function () {
      return self.maxSpeed() * 1000 / ((self.maxSpeed() * self.maxSpeed()) );
    });

    self.wheel.subscribe(function (val) {
      self.notifier(val);
    });

    self.changedCalculation = ko.computed(function () {
      self.wheel();
      self.maxSpeed();

      //self.changed(true);
    });

    self.changed(false);
  }

  ko.utils.extend(Car.prototype, {
    update: function (data) {
      data = data || {};

      this.name = data.name;
      this.wheel(data.wheel);
      this.maxSpeed(data.maxSpeed);

      // settle the changed status
      this.changed(false);
    },
    notifier: function(message) {

    }
  });

  lib.model = lib.model || {};
  lib.model.Car = Car;

}(window.lib = window.lib || {}));