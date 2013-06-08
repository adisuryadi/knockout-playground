describe('Container', function() {

  describe("when it's created", function() {
  
    beforeEach(function() {
      this.container = new Lib.ContainerViewModel();
    });

    it('should be able to explicitly given a name', function() {
      var container1 = new Lib.ContainerViewModel('container #1');
      expect(container1.name).toBe('container #1');
    });

    it('should have empty string as default name', function() {
      expect(this.container.name).toBe('');
    });

    it('should have set current selected box to null', function() {
      expect(this.container.selectedBox()).toBeNull();
    });

  });


  describe('when invoke add new box method', function() {

    beforeEach(function() {
      this.container = new Lib.ContainerViewModel('Main Container');
      this.newBox = this.container.addNewBox();
    });

    it('should return a box model instance', function() {
      expect(this.newBox.constructor).toBe(Lib.Box);
    });

    it('should set the new box model to the selected box property', function() {
      var selectedBox = this.container.selectedBox();
      expect(selectedBox).toBe(this.newBox);
    });

    describe('then done editing with valid box', function() {
     
      beforeEach(function () {
        this.newBox.name('New Box'); // Give name so it valid
      });
      
      it('should add the new box to the container\'s box collection', function() {
        var boxCollection = this.container.boxCollection();
        this.container.doneEditingBox();
        expect(boxCollection.indexOf(this.newBox)).not.toBeLessThan(0);
      });

      it('should clear the selected box property after the new box added to the collection', function() {
        this.container.doneEditingBox();
        expect(this.container.selectedBox()).toBeNull();
      });

    });

    describe('then done editing with not valid box', function() {
      var boxCollection, selectedBox;

      beforeEach(function() {
        boxCollection = this.container.boxCollection();
        selectedBox = this.container.selectedBox();
      });

      // TODO need cancel commit state
      xit('should not add the new box to the container\'s box collection', function() {
        selectedBox.name(''); // empty string is not valid box name
        this.container.doneEditingBox();
        expect(boxCollection.indexOf(this.newBox)).toBe(-1);
      });

      it('should persist the selected box', function() {
        selectedBox.name(''); // empty string is not valid box name
        this.container.doneEditingBox();
        expect(this.container.selectedBox()).toBe(this.newBox);
      });

    });

  });


  describe('when invoke edit a box method', function() {

    beforeEach(function() {
      this.container = new Lib.ContainerViewModel();
      this.box1 = this.container.addNewBox();
      this.box1.name('box1');
      this.container.doneEditingBox();
      
      this.box2 = this.container.addNewBox();
      this.box2.name('box2');
      this.container.doneEditingBox();
    });

    it('should select the correct box', function() {
      this.container.editBox(this.box1);
      expect(this.container.selectedBox()).toBe(this.box1); 
    });

    xdescribe('then cancel the edit process', function() {
         
    });

    xdescribe('then done editing', function() {
      
      beforeEach(function() {
        var editedBox = this.container.editBox(this.box1);
        editedBox.name = 'Edited Box Name';
        this.container.doneEditingBox();
      });

      it('should clear the selected box property after the new box added to the collection', function() {
        expect(this.container.selectedBox()).toBeNull();
      });

    });

  });

  describe('done editing', function() {
      
    it('should throw exception if selected box is empty', function() {
      var container = new Lib.ContainerViewModel();
      container.selectedBox(null);
      expect(function () { container.doneEditingBox(); }).toThrow();
    });
  });

});

describe('Box', function() {
  
  describe("when it's created", function() {
    var boxFactory;

    beforeEach(function() {
      boxFactory = {
        name: 'Box #1'
      };

      this.box = new Lib.Box();
    });

    it('should be able to explicitly given a name', function() {
      var box = new Lib.Box('box #1');
      expect(box.name()).toBe('box #1');
    });

    it('should have empty string as default name', function() {
      this.box.name('');
      expect(this.box.name()).toBe('');
    });
   
    it("should not valid if don't have name", function() {
      this.box.name('');
      expect(this.box.valid()).toBeFalsy();
      expect(this.box.errors.indexOf('Name is a required field')).not.toBeLessThan(0);
    });

    it('should not valid if only whitespaces', function() {
      this.box.name('      ');  
      expect(this.box.valid()).toBeFalsy();
      expect(this.box.errors.indexOf('Name is a required field')).not.toBeLessThan(0);
    });
  });

});
