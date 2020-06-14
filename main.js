
const manager = require('./creepManager');
const architector = require('./architector');
const tools = require('tools');

module.exports.loop = function () {
    tools.clearMem();
    tools.resetSettings();
    tools.getStat();
    
    architector.run();

    manager.run();
    
    
    tools.report();

    if(Memory.idx >= 10000) Memory.idx = 1;
}