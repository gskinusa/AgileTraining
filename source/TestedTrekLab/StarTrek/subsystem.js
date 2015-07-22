Subsystem = function(subsystemType, damageUnit, recoveryUnit) {
	this.canOperate = true;
	this.damageCapability = damageUnit; // should be set to a initial value by the ship based on subsytem ex: phaser =300, shield = 500, warp engine = 200
	this.unitOfReapir = recoveryUnit;
	this.timeToRecover = 0; // in terms of star date
	this.type =subsystemType; // can be phaser, warp engine, shield
};

// type, damageUnit, recoveryUnit
Subsystem.prototype = { 
 
    isOperable: function() {
		return this.canOperate;
		
    },
	getDamaged: function(damageAmount) {
		if(this.damageCapability <= damageAmount) // only in this scenario damage occurs
		{
			this.setTimeToRecover(damageAmount);
			this.shutDownSubsystem();
		}
		
	},
	setTimeToRecover: function(damageAmount)
	{
		var unitOfDamage = this.getUnitOfDamage(damageAmount);
		
		this.timeToRecover = this.unitOfReapir * unitOfDamage;
	},
	shutDownSubsystem: function()
	{
		this.canOperate = false;
	},
	rest: function()
	{
		if(this.timeToRecover != 0)
		{
			this.timeToRecover = this.timeToRecover - this.unitOfReapir;
			this.resetOperableStatus();
		}
		
	},
	resetOperableStatus: function()
	{
		if(this.timeToRecover ==0)
		{
			this.canOperate = true;
		}
	},
	getUnitOfDamage: function(damageAmount)
	{
		return Math.floor(damageAmount/this.damageCapability);
	}
};