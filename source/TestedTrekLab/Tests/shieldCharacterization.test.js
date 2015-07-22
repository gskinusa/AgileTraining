describe("shield", function() {
    var shield;
    var initialEnergy;
    
    beforeEach(function() {
        shield = new Shield();
        shield.energy = 5000;

        initialEnergy = shield.energy;
    });


    it("try to create a shield and verify default values", function() {
        expect(shield.isUp).toBe(false);
        expect(shield.energy).toBe(5000);
    });

    it("can we raise shield", function() {
        shield.raise();
        expect(shield.isUp).toBe(true);
    });

    it("can we lower shield if it is up", function() {
        shield.raise();
        
        shield.lower();
        expect(shield.isUp).toBe(false);
    });

      describe("damage within boundaries", function() {
        var damageAmount;
        var newEnergyAmount;
        var amountNotAbsorbed;
        
        beforeEach(function () {
            shield.raise();
            damageAmount = 100;
            newEnergyAmount = 4900;
            
            amountNotAbsorbed = shield.damage(damageAmount);
        });
    
        it("shield is still up", function() {
            expect(shield.isUp).toBe(true);
        });
    
        it("shield energy is equal to 4900", function() {
            expect(shield.energy).toBe(newEnergyAmount);
        });

        it("shield amount not absorbed is 0", function() {
            expect(amountNotAbsorbed).toBe(0);
        });
      });






    it("does shield go down when damaged beyond capacity", function() {
        shield.raise();
        var damageAmount = 6000;
        
        var amountNotAbsorbed = shield.damage(damageAmount);
        
        expect(shield.isUp).toBe(false);
        expect(shield.energy).toBe(0);
        expect(amountNotAbsorbed).toBe(1000);
    });


    it("can we transfer energy to shield", function() {
        shield.raise();
        var transferAmount = 1;
        var shipReserve = new ShipReserve();
        
        var amountNotAbsorbed = shield.requestEnergy(shipReserve, transferAmount);
        
        expect(shield.isUp).toBe(true);
        expect(shield.energy).toBe(5001);
        expect(amountNotAbsorbed).toBe(0);
    });

    it("can we transfer energy to shield even if it's not up", function() {
        var transferAmount = 1;
        var shipReserve = new ShipReserve();
        
        var amountNotAbsorbed = shield.requestEnergy(shipReserve, transferAmount);
        
        expect(shield.isUp).toBe(false);
        expect(shield.energy).toBe(5001);
        expect(amountNotAbsorbed).toBe(0);
    });

    it("if we go over max shield, some amount will not be aborbed by the shield and some will be returned", function() {
        var transferAmount = 6000;

        var shipReserve = new ShipReserve();
        shipReserve.reserve = 500000;
        
        var amountNotAbsorbed = shield.requestEnergy(shipReserve, transferAmount);
        
        expect(shield.energy).toBe(10000);
        expect(amountNotAbsorbed).toBe(1000);
    });

});
