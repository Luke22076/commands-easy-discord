const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {string} commandsPath
 * @returns {Map}
 */
function loadCommands(commandsPath) {
    const commands = new Map();
    const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of files) {
        const command = require(path.join(commandsPath, file));
        if (command.name && typeof command.execute === 'function') {
            commands.set(command.name, command);
        } else {
            console.warn(`[WARN] Command ${file} has no "name" or "execute"-Function!`);
        }
    }

    return commands;
}

module.exports = { loadCommands };
