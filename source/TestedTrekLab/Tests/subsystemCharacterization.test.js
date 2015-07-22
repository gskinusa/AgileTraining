describe("subsystem", function() {

	var subsystem;

    beforeEach(function() {
        subsystem = new Subsystem("any subsystem", 300, 1);
	

    });

    it ("is subsystem initialized as operable", function() {
         // when

		var subsystemStatus = subsystem.isOperable();

        // then
       expect(true).toBe(subsystemStatus);
	   expect('any subsystem').toBe(subsystem.type);
    });
	
    it ("if subsystem gets damanged within the maximum damage it can take then absorb damage capability should reduce", function() {
        // given
        subsystem.damageCapability = 300; // maximum damage the subsystem can take
		var damageAmount = 50;
		
		
        // when

		subsystem.getDamaged(damageAmount);
		
        // then
		var damageAbsorbtionLeft = subsystem.damageCapability;
       	expect(300).toBe(damageAbsorbtionLeft);
    });
	
    it ("if subsystem gets damanged more than the maximum damage it can take then the subsystem should not be operable", function() {
        // given
        subsystem.damageCapability = 300; // maximum damage the subsystem can take
		var damageAmount = 320;
		
		
        // when

		subsystem.getDamaged(damageAmount);
		
        // then
		var damageAbsorbtionLeft = subsystem.damageCapability;
		
		// the subsystem should not be operable
		expect(false).toBe(subsystem.isOperable());
    });

    describe("recovery with phaser", function() {

      
      beforeEach(function () {
		  
          subsystem.type = 'Phaser';
		  subsystem.damageCapability = 300;
		  subsystem.unitOfRepair = 1; // star date
      });
  
      it("phaser subsystem created", function() {
          expect('Phaser').toBe(subsystem.type);
      });
      it("phaser gets damaged and the time to recover should change", function() {
		  
		  var damageAmount = 600;
		  subsystem.getDamaged(damageAmount);
		  
          expect(2).toBe(subsystem.timeToRecover);
      });
      it("phaser gets damaged and rested for enough time for phaser to become operational", function() {
		  
		  var damageAmount = 600;
		  subsystem.getDamaged(damageAmount);
		  // each rest call will recover the subsystem by 1 unit of repair. timeToRecover should reduce
		  subsystem.rest();
		  subsystem.rest();
		  
          expect(true).toBe(subsystem.isOperable());
      });
	  
      it("phaser gets damaged and did not rest for enough time then it should not be operable", function() {
		  
		  var damageAmount = 600;
		  subsystem.getDamaged(damageAmount);
		  // each rest call will recover the subsystem by 1 unit of repair. timeToRecover should reduce
		  subsystem.rest();
		
		  
          expect(false).toBe(subsystem.isOperable());
      });
      
    });
	
    describe("recovery with shields", function() {

      
      beforeEach(function () {
          subsystem.type = 'Shield';
		  subsystem.damageCapability = 500;
		  subsystem.unitOfRepair = 1; // star date
      });
  
      it("phaser subsystem created", function() {
          expect('Shield').toBe(subsystem.type);
      });
      it("Shield gets damaged and the time to recover should change", function() {
		  
		  var damageAmount = 1500;
		  subsystem.getDamaged(damageAmount);
		  
          expect(3).toBe(subsystem.timeToRecover);
      });
      
      it("Shield gets damaged and rested for enough time for shield to become operational", function() {
		  
		  var damageAmount = 1500;
		  subsystem.getDamaged(damageAmount);
		  // each rest call will recover the subsystem by 1 unit of repair. timeToRecover should reduce
		  subsystem.rest();
		  subsystem.rest();
		  subsystem.rest();
		  
          expect(true).toBe(subsystem.isOperable());
      });
	  
      it("Sheild gets damaged and did not rest for enough time then it should not be operable", function() {
		  
		  var damageAmount = 1500;
		  subsystem.getDamaged(damageAmount);
		  // each rest call will recover the subsystem by 1 unit of repair. timeToRecover should reduce
		  subsystem.rest();
		
		  
          expect(false).toBe(subsystem.isOperable());
      });
    });
	
	
    describe("recovery with Warp Engine", function() {

      
      beforeEach(function () {
          subsystem.type = 'WarpEngine';
		  subsystem.damageCapability = 200;
		  subsystem.unitOfRepair = 1; // star date
      });
  
      it("phaser subsystem created", function() {
          expect('WarpEngine').toBe(subsystem.type);
      });
      it("Warp Engine gets damaged and the time to recover should change", function() {
		  
		  var damageAmount = 600;
		  subsystem.getDamaged(damageAmount);
		  
          expect(3).toBe(subsystem.timeToRecover);
      });
	  
      
      it("Warp Engine gets damaged and rested for enough time for shield to become operational", function() {
		  
		  var damageAmount = 800;
		  subsystem.getDamaged(damageAmount);
		  // each rest call will recover the subsystem by 1 unit of repair. timeToRecover should reduce
		  subsystem.rest();
		  subsystem.rest();
		  subsystem.rest();
		  subsystem.rest();
		  
          expect(true).toBe(subsystem.isOperable());
      });
	  
      it("Warp Engine gets damaged and did not rest for enough time then it should not be operable", function() {
		  
		  var damageAmount = 600;
		  subsystem.getDamaged(damageAmount);
		  // each rest call will recover the subsystem by 1 unit of repair. timeToRecover should reduce
		  subsystem.rest();
		
		  
          expect(false).toBe(subsystem.isOperable());
      });
      
    });
    
});

