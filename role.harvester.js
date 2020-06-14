var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if((creep.memory.harvesting) && (creep.store.getFreeCapacity() == 0)){
            creep.memory.harvesting = false;
            creep.say('Transfering');
        }
        if(!(creep.memory.harvesting) && (creep.store.getUsedCapacity() == 0)){
            creep.memory.harvesting = true;
            creep.say('Harvesting');
        }
	    if(creep.memory.harvesting) {
            //creep.say('Must harvest');
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(creep.room.controller);
                }
            }
        }
	}
};

module.exports = roleHarvester;