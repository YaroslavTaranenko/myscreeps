/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.repairer');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    run: (creep)=>{
        if((creep.memory.repairing) &&(creep.store.getUsedCapacity() == 0)){
            creep.memory.repairing = false;
            creep.say('Getting energy.');
        }
        if(!(creep.memory.repairing) &&(creep.store.getFreeCapacity() == 0)){
            creep.memory.repairing = true;
            creep.say('Repairing....');
        }
        if(creep.memory.repairing){
            let targets = creep.room.find(FIND_STRUCTURES, {filter: (s)=>s.structureType != STRUCTURE_WALL && s.hits < s.hitsMax});
            // console.log(targets);
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(targets[0], {visualizePathStyle:{stroke: '#fffa00'}});
            }
        }else{
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
    
};