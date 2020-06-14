


module.exports = {
    spawnBalancedCreep = (energy, role)=>{
        
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
    }
}