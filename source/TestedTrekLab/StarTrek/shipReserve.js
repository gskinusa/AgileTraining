// Ship Reserve 
ShipReserve = function() {
    this.reserve = 1000; // default
	this.minReserveEnergy = 150; // default
};

ShipReserve.prototype = {
 
    transferEnergy: function(energyRequired) {
		if(this.getAvailableEnergy() > energyRequired)
		{
			this.reduceReserve(energyRequired);
			return energyRequired;
		} else
		{
			var energyReturn = this.getAvailableEnergy();
			this.reduceReserve(energyReturn); 
			return energyReturn; 
		}
		
    },
    reduceReserve: function(energyToReduce) {
		
			this.reserve = this.reserve - energyToReduce;
	},
	
    getAvailableEnergy: function() {
		
			return this.reserve - this.minReserveEnergy;
	}
};