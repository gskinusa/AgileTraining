Shield = function() {
    this.energy = 5000;
    this.energyMin = 0;
    this.energyMax = 10000;
    this.isUp = false;
};

Shield.prototype = {
    
    raise: function() {
        if(!this.isUp && this.energy > 0) {
            this.isUp = true;
        }
    }, 
    
    lower: function () {
        if (this.isUp || this.energy == 0) {
            this.isUp = false;
        }
    },
    
    damage: function(damageAmount) {
        // return the amount of energy not absorbed by the shield
        var amountNotAbsorbed = 0;

        if (this.isUp) {
            if (this.energy > damageAmount) {
                this.energy = this.energy - damageAmount;
            }
            else {
                // shield is damaged beyond capacity and leftover damage is returned as damage to subsystem
                amountNotAbsorbed = damageAmount - this.energy;
                this.energy = 0;
                this.isUp = false;
            }
        }
        return amountNotAbsorbed;
        
    },
    
    requestEnergy: function(shipReserve, amountRequested) {
        var amountFromShipReserve = shipReserve.transferEnergy(amountRequested);
//        var amountFromShipReserve = amountRequested; // replace with actual energy received later
        var leftOverAmount = 0;
        
        // apply amountFromShipReserve to shield
        if (this.energy + amountFromShipReserve < this.energyMax) {
            this.energy = this.energy + amountFromShipReserve;
        }
        else {
            leftOverAmount = amountFromShipReserve - (this.energyMax - this.energy);
            this.energy = this.energyMax;
            
            // any amount not able to be sent to shield is lost for now
        }
        return leftOverAmount;
    }
    
};