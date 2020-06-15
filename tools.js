module.exports = {
    roles: {
        harvester: 'harvester',
        upgrader: 'upgrader',
        builder: 'builder',
        repairer: 'repairer',
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
        Memory.repairersCnt = _.filter(Game.creeps, (creep)=>creep.memory.role == module.exports.roles.repairer).length;
    },
    report: ()=>{
        let rep = `harvs: ${Memory.harvsCnt}/${Memory.harvsMax}; upgs: ${Memory.upgradersCnt}/${Memory.upgradersMax}; builders: ${Memory.buildersCnt}/${Memory.buildersMax}; `;
        rep += `Repairers: ${Memory.repairersCnt}/${Memory.repairersMax}; `;
        rep += `SpawnFreeCap: ${Game.spawns[Memory.spawnName].store.getFreeCapacity('energy')}`;
        console.log(Game.time, rep);
    }
}