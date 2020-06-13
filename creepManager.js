const roleHarvester = require('./role.harvester');
const roleBuilder = require('./role.builder');
const roleUpgrader = require('./role.upgrader');

const tools = require('./tools');

module.exports = {
    spawnRequired: ()=>{
        if(Memory.harvsCnt < Memory.harvsMax){
            let newName = 'Harvy' + Memory.idx;
            if(Game.spawns[Memory.spawnName].spawnCreep([MOVE, CARRY, WORK], newName, {memory: {role: tools.roles.harvester}}) == OK){
                Memory.idx++;
            }
        }else if(Memory.upgradersCnt < Memory.upgradersMax){
            let newName = 'Upgrader' + Memory.idx;
            if(Game.spawns[Memory.spawnName].spawnCreep([MOVE, CARRY, WORK], newName, {memory: {role: tools.roles.upgrader}}) == OK){
                Memory.idx++;
            }
        }else if(Memory.buildersCnt < Memory.buildersMax){
            let newName = 'Builder' + Memory.idx;
            if(Game.spawns[Memory.spawnName].spawnCreep([MOVE, CARRY, WORK], newName, {memory: {role: tools.roles.builder}}) == OK){
                Memory.idx++;
            }
        }

        if(Game.spawns[Memory.spawnName].spawning) { 
            var spawningCreep = Game.creeps[Game.spawns[Memory.spawnName].spawning.name];
            Game.spawns[Memory.spawnName].room.visual.text(
                '🛠️' + spawningCreep.name,
                Game.spawns[Memory.spawnName].pos.x + 1, 
                Game.spawns[Memory.spawnName].pos.y, 
                {align: 'left', opacity: 0.8});
        }
    },
    run: ()=>{
        module.exports.spawnRequired();

        for(name in Game.creeps){
            const creep = Game.creeps[name];
            if(creep.memory.role == tools.roles.harvester){
                roleHarvester.run(creep);
            }
            if(creep.memory.role == tools.roles.upgrader){
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == tools.roles.builder){
                roleBuilder.run(creep);
            }
        }
    }
}