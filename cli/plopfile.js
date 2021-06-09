// #region imports
const removeGenerator = require('./_generators/remove-generator');
const remove = require('./_actions/remove');
const addLine = require('./_actions/add-line');
const removeLine = require('./_actions/remove-line');
const actUpdate = require('./_actions/update-template');
const genUpdate = require('./_generators/update-template.js');
const removeCommandOption = require('./_generators/remove-command-option');
const addCommandOption = require('./_generators/add-command-option');
const addGenerator = require('./_generators/add-generator');
const addCommand = require('./_generators/add-command');
const removeCommand = require('./_generators/remove-command');
const init = require('./_generators/init');
const addAction = require('./_generators/add-action');
const removeAction = require('./_generators/remove-action');
const addDirectory = require('./_actions/add-directory');
const initCache = require('./_actions/init-cache');
// #endregion imports

module.exports = function (plop) {

    // #region actions
    plop.setActionType('update-template', actUpdate);
    plop.setActionType('remove', remove);
    plop.setActionType('add-line', addLine);
    plop.setActionType('remove-line', removeLine);
    plop.setActionType('add-directory', addDirectory);
    plop.setActionType('init-cache', initCache);
// #endregion actions

    // #region generators
	plop.setGenerator('remove-generator', removeGenerator);
    plop.setGenerator('update-template', genUpdate);
    plop.setGenerator('remove-command-option', removeCommandOption);
    plop.setGenerator('add-command-option', addCommandOption);
    plop.setGenerator('add-generator', addGenerator);
    plop.setGenerator('add-command', addCommand);
    plop.setGenerator('remove-command', removeCommand);
    plop.setGenerator('init', init);
    plop.setGenerator('add-action', addAction);
    plop.setGenerator('remove-action', removeAction);
    // #endregion generators
};
