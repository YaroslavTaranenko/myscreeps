



const arch = {
    extensions: null,
    constructionExtensions: null,
    constructingStructures: null,
    structures: null,
    controlLvl: 0,


    addExtensions: (pos)=>{
        // console.log('Must start construction type 1');
        let spawn = Game.spawns[Memory.spawnName];
        spawn.room.createConstructionSite(pos.x, pos.y, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+1, pos.y, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+2, pos.y, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+1, pos.y - 1, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+1, pos.y + 1, STRUCTURE_EXTENSION);

        spawn.room.createConstructionSite(pos.x-1, pos.y, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x, pos.y-1, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x, pos.y+1, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+1, pos.y-2, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+1, pos.y+2, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+2, pos.y-1, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+2, pos.y+1, STRUCTURE_EXTENSION);
        spawn.room.createConstructionSite(pos.x+3, pos.y, STRUCTURE_EXTENSION);            
        
    },
    buildExtensions: () => {
        if((arch.constructionExtensions.length + arch.extensions.length) < ((arch.controlLvl - 1)*5)){
            let spawn = Game.spawns[Memory.spawnName];
            if((arch.constructionExtensions.length + arch.extensions.length) == 0){
                arch.addExtensions({x: spawn.pos.x - 5, y: spawn.y});
            }else if((arch.constructionExtensions.length + arch.extensions.length) == 5){
                arch.addExtensions({x: spawn.pos.x + 1, y: spawn.y});
            }else if((arch.constructionExtensions.length + arch.extensions.length) == 10){
                arch.addExtensions({x: spawn.pos.x - 7, y: spawn.y-3});
            }else if((arch.constructionExtensions.length + arch.extensions.length) == 15){
                arch.addExtensions({x: spawn.pos.x + 2, y: spawn.y+3});
            }
        }
    },


    countBuildings: ()=>{
        let spawn = Game.spawns[Memory.spawnName];
        arch.structures = spawn.room.find(FIND_STRUCTURES);
        arch.constructingStructures = spawn.room.find(FIND_CONSTRUCTION_SITES);
        arch.extensions = _.filter(arch.structures, (structure)=>{
            return structure.structureType == STRUCTURE_EXTENSION
        });
        arch.constructionExtensions = _.filter(arch.constructingStructures, (cs)=>{
            return cs.structureType == STRUCTURE_EXTENSION
        })
        arch.controlLvl = Game.spawns[Memory.spawnName].room.controller.level;
        arch.roomEnergyCapacity = Game.spawns[Memory.spawnName].room.energyCapacityAvailable;

        if(arch.constructingStructures == 0){
            Memory.buildersMax = 0;
        }

        console.log(`structures: ${arch.structures.length}; extensions: ${arch.extensions.length}/${(arch.controlLvl - 1) * 5};`);
        console.log(`Energy cap: ${arch.roomEnergyCapacity}; constructing structures: ${arch.constructingStructures.length}; constructing extensions: ${arch.constructionExtensions.length}/${(arch.controlLvl - 1) * 5}; `);
    },
    run: ()=>{
        arch.countBuildings();
        arch.buildExtensions();
    }
}

module.exports = arch;