var roleBuilder = {
    run (creep){
        // console.log('must build');
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0){
            creep.memory.building = true;
            creep.say('🚧 build');
        }


        if(creep.memory.building){
            let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length){
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targets[0], {visualizePathStyle:{stroke: '#fff'}});
                }
            }else{
                let roads = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_ROAD ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.hits < structure.hitsMax;
                    }
                });
                if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(roads[0], {visualizePathStyle:{stroke: '#fff'}});
                }else{
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
        }else{
            let resources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(resources[1]) == ERR_NOT_IN_RANGE){
                creep.moveTo(resources[1], {visualizePathStyle:{stroke: '#faa'}});
            }
        }
    }

    
}

module.exports = roleBuilder;