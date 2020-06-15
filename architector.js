



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

        spawn.room.createConstructionSite(pos.x-1, pos.y, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x, pos.y-1, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x, pos.y+1, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x+1, pos.y-2, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x+1, pos.y+2, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x+2, pos.y-1, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x+2, pos.y+1, STRUCTURE_ROAD);
        spawn.room.createConstructionSite(pos.x+3, pos.y, STRUCTURE_ROAD);            
        
    },
    buildExtensions: () => {
        
        let spawn = Game.spawns[Memory.spawnName];
        let pos = {x: spawn.pos.x - 4, y: spawn.pos.y};
        // console.log(pos.x, pos.y);
        // console.log(spawn.room.createConstructionSite(pos.x-1, pos.y, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x, pos.y-1, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x, pos.y+1, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x+1, pos.y-2, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x+1, pos.y+2, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x+2, pos.y-1, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x+2, pos.y+1, STRUCTURE_ROAD));
        // console.log(spawn.room.createConstructionSite(pos.x+3, pos.y, STRUCTURE_ROAD)); 

        arch.addExtensions({x: spawn.pos.x - 4, y: spawn.pos.y});
        if((arch.constructionExtensions.length + arch.extensions.length) < ((arch.controlLvl - 1)*5)){
            let spawn = Game.spawns[Memory.spawnName];
            if((arch.constructionExtensions.length + arch.extensions.length) == 0){
                arch.addExtensions({x: spawn.pos.x - 4, y: spawn.pos.y});
            }else if((arch.constructionExtensions.length + arch.extensions.length) == 5){
                arch.addExtensions({x: spawn.pos.x + 2, y: spawn.pos.y});
            }else if((arch.constructionExtensions.length + arch.extensions.length) == 10){
                arch.addExtensions({x: spawn.pos.x - 1, y: spawn.pos.y-3});
            }else if((arch.constructionExtensions.length + arch.extensions.length) == 15){
                arch.addExtensions({x: spawn.pos.x - 1, y: spawn.pos.y+3});
            }
        }
    },


    countBuildings: ()=>{
        let spawn = Game.spawns[Memory.spawnName];
        arch.structures = spawn.room.find(FIND_STRUCTURES);
        arch.constructingStructures = spawn.room.find(FIND_CONSTRUCTION_SITES);
        arch.repairables = _.filter(arch.structures, (s)=>{
            return s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        })
        arch.extensions = _.filter(arch.structures, (structure)=>{
            return structure.structureType == STRUCTURE_EXTENSION
        });
        arch.constructionExtensions = _.filter(arch.constructingStructures, (cs)=>{
            return cs.structureType == STRUCTURE_EXTENSION
        })
        arch.controlLvl = Game.spawns[Memory.spawnName].room.controller.level;
        arch.roomEnergyCapacity = Game.spawns[Memory.spawnName].room.energyCapacityAvailable;

        if(arch.constructingStructures.length > 0){
            // console.log('stupid if: ', arch.constructingStructures);
            Memory.buildersMax = 5;
        }else if(arch.constructingStructures.length === 0){
            // console.log('stupid second if: ' + arch.constructingStructures.length);
            Memory.buildersMax = 0;
        }
        let enRep = `Energy : ${Game.spawns[Memory.spawnName].room.energyAvailable}/${arch.roomEnergyCapacity};`;
        enRep += `structures: ${arch.structures.length}; extensions: ${arch.extensions.length}/${(arch.controlLvl - 1) * 5};`;
        console.log(enRep);
        let rep = ` constructing structures: ${arch.constructingStructures.length}; constructing extensions: ${arch.constructionExtensions.length}/${(arch.controlLvl - 1) * 5}; `;
        rep += `repairables: ${arch.repairables.length}`;
        console.log(rep);
    },
    run: ()=>{
        arch.countBuildings();
        arch.buildExtensions();
    }
}

module.exports = arch;