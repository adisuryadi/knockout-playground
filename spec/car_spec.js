describe("Car", function() {
  var karimunFactory = {
    name: 'Karimun',
    wheel: 4,
    maxSpeed: 75
  };

  beforeEach(function() {
    this.myCar = new lib.model.Car();
  });


  it("set the number of wheel correctly", function() {
    this.myCar.wheel(4);
    expect(this.myCar.wheel()).toBe(4);
  });

  it("should notify subscriber if number of wheel changed", function() {
    spyOn(this.myCar, "notifier");
    this.myCar.wheel(12);
    expect(this.myCar.notifier).toHaveBeenCalledWith(12);
  });

  it("should have distance per litre of 10 if maxspeed is 100", function() {
    this.myCar.maxSpeed(100);
    expect(this.myCar.distancePerLitre()).toBe(10);
  });  

  it("should have distance per litre of 20 if maxspeed is 50", function() {
    this.myCar.maxSpeed(50);
    expect(this.myCar.distancePerLitre()).toBe(20);
  });

  it("can be initialize correctly from within creation", function() {
    var myKarimun = new lib.model.Car(karimunFactory);
    expect(myKarimun.name).toEqual(karimunFactory.name);
    expect(myKarimun.wheel()).toEqual(karimunFactory.wheel);
    expect(myKarimun.maxSpeed()).toEqual(karimunFactory.maxSpeed);
  });

  xit("should set the changed to false after initialization", function() {
    var myKarimun = new lib.model.Car(karimunFactory);
    expect(myKarimun.changed()).toBeFalsy();
  });

  it("should set model to dirty mode if any value prior to initialization being change", function() {
    var myKarimun = new lib.model.Car(karimunFactory);
    myKarimun
  });  
});