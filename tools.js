module.exports = {
    roles: {
        harvester: 1,
        upgrader: 2,
        builder: 3,
    },
    resetSettings: ()=>{
        if(!Memory.resetSettings) return;
        
        Memory.harvsMax = 3;
        Memory.upgradersMax = 1;
        Memory.buildersMax = 1;
        Memory.debug = false;
        Memory.report = true;
        Memory.spawnName = 'Core';
        
        Memory.resetSettings = false;

        if((Memory.idx == undefined) || (Memory.idx == null)) Memory.idx = 1;
    },
    clearMem: ()=>{
        for(var i in Memory.creeps) {
            if(!Game.creeps[i]) {
                delete Memory.creeps[i];
            }
        }
    },
    getStat: ()=>{
        Memory.harvsCnt = _.filter(Game.creeps, (creep)=>creep.memory.role == module.exports.roles.harvester).length;
        Memory.upgradersCnt = _.filter(Game.creeps, (creep)=>creep.memory.role == module.exports.roles.upgrader).length;
        Memory.buildersCnt = _.filter(Game.creeps, (creep)=>creep.memory.role == module.exports.roles.builder).length;
    },
    report: ()=>{
        let rep = `harvs: ${Memory.harvsCnt}/${Memory.harvsMax}; upgs: ${Memory.upgradersCnt}/${Memory.upgradersMax}; builders: ${Memory.buildersCnt}/${Memory.buildersMax}; `;
        rep += `SpawnFreeCap: ${Game.spawns[Memory.spawnName].store.getFreeCapacity('energy')}`;
        console.log(Game.time, rep);
    }
}