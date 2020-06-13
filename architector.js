



const arch = {
    extensions: null,
    constructionExtensions: null,
    constructingStructures: null,
    structures: null,
    controlLvl: 0,


    addExtensions: ()=>{
        if((arch.constructionExtensions.length + arch.extensions.length) < ((arch.controlLvl - 1)*5)){
            Memory.buildersMax = 5;
            if((arch.constructionExtensions.length + arch.extensions.length) == 0){
                // console.log('Must start construction type 1');
                let spawn = Game.spawns[Memory.spawnName];
                spawn.room.createConstructionSite(spawn.pos.x - 2, spawn.pos.y, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 4, spawn.pos.y, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y - 1, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y + 1, STRUCTURE_EXTENSION);
            }
            if((arch.constructionExtensions.length + arch.extensions.length) == 5){
                // console.log('Must start construction type 1');
                let spawn = Game.spawns[Memory.spawnName];
                spawn.room.createConstructionSite(spawn.pos.x - 4, spawn.pos.y - 2, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 5, spawn.pos.y - 2, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 6, spawn.pos.y - 2, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 5, spawn.pos.y - 1, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 5, spawn.pos.y - 3, STRUCTURE_EXTENSION);
            }
            if((arch.constructionExtensions.length + arch.extensions.length) == 10){
                // console.log('Must start construction type 1');
                let spawn = Game.spawns[Memory.spawnName];
                spawn.room.createConstructionSite(spawn.pos.x - 6, spawn.pos.y, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 7, spawn.pos.y, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 8, spawn.pos.y, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 7, spawn.pos.y - 1, STRUCTURE_EXTENSION);
                spawn.room.createConstructionSite(spawn.pos.x - 7, spawn.pos.y + 1, STRUCTURE_EXTENSION);
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

        console.log(`structures: ${arch.structures.length}; extensions: ${arch.extensions.length}/${(arch.controlLvl - 1) * 5};`);
        console.log(`constructing structures: ${arch.constructingStructures.length}; constructing extensions: ${arch.constructionExtensions.length}/${(arch.controlLvl - 1) * 5};`);
    },
    run: ()=>{
        arch.countBuildings();
        arch.addExtensions();
    }
}

module.exports = arch;