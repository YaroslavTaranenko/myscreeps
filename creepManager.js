
const roleHarvester = require('./role.harvester');
const roleBuilder = require('./role.builder');
const roleUpgrader = require('./role.upgrader');

const tools = require('./tools');

const cm = {
    spawnBalancedCreep: (energy, role)=>{
        
        let _this = this;
        let bodyParts = Math.floor(energy / 200);
        
        let body = [];

        for(let i = 0; i < bodyParts; i++){
            body.push(WORK);
        }
        for(let i = 0; i < bodyParts; i++){
            body.push(CARRY);
        }
        for(let i = 0; i < bodyParts; i++){
            body.push(MOVE);
        }
        let newName = role + Memory.idx;

        let resp = Game.spawns[Memory.spawnName].spawnCreep(body, newName, {memory:{role: role}});
        if(resp == OK){
            Memory.idx++;
        }
        return resp;
    },
    spawnRequired: ()=>{
        let spawn = Game.spawns[Memory.spawnName];
        if(Memory.harvsCnt < Memory.harvsMax){
            if((cm.spawnBalancedCreep(spawn.room.energyCapacityAvailable, tools.roles.harvester) == ERR_NOT_ENOUGH_ENERGY) &&(Memory.harvsCnt == 0)){
                cm.spawnBalancedCreep(200, tools.roles.harvester);
            }
        }else if(Memory.upgradersCnt < Memory.upgradersMax){
            if(cm.spawnBalancedCreep(spawn.room.energyCapacityAvailable, tools.roles.upgrader) == OK){
                
            }
        }else if(Memory.buildersCnt < Memory.buildersMax){
            if(cm.spawnBalancedCreep(spawn.room.energyCapacityAvailable, tools.roles.builder) == OK){
                
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


module.exports = cm;