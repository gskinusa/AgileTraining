describe("ship reserve", function() {

	var shipReserve;

    beforeEach(function() {
        shipReserve = new ShipReserve();
		shipReserve.reserve = 1000;
		shipReserve.minReserveEnergy = 150;

    });

    it ("get energy from reserve", function() {
        // given
        var energyRequired = 100;
		var energyReturn = '';

        // when

		energyReturn = shipReserve.transferEnergy(energyRequired);

        // then
       expect(100).toBe(energyReturn);
    });
	
    it ("get energy from reserve then reserve should reduce", function() {
        // given
        var energyRequired = 100;
		var energyReturn = '';

        // when
		energyReturn = shipReserve.transferEnergy(energyRequired);

        // then
       expect(900).toBe(shipReserve.reserve);
    });

    it ("get energy from reserve when reserver does not have enough", function() {
        // given
        var energyRequired = 1100;
		var energyReturn = '';

        // when
		energyReturn = shipReserve.transferEnergy(energyRequired);

        // then
       expect(850).toBe(energyReturn);
    });
	

    it ("get energy from reserve when reserve does not have enough and minimal energy to be maintained", function() {
        // given
		
        var energyRequired = 1100;
		var energyReturn = '';

        // when
      
		energyReturn = shipReserve.transferEnergy(energyRequired);

        // then shipReserve should be at minimal level
	   expect(150).toBe(shipReserve.reserve);
    });
	
	// energy returned to ship reserve
	

    
});

