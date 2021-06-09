// >imports
const removeGenerator = require('./_generators/remove-generator');
const remove = require('./_actions/remove');
const del = require('./_actions/delete');
const addLine = require('./_actions/add-line');
const removeLine = require('./_actions/remove-line');
const actUpdate = require('./_actions/update-template');
const genUpdate = require('./_generators/update-template.js');
const removeCommandOption = require('./_generators/remove-command-option');
const addCommandOption = require('./_generators/add-command-option');
const addGenerator = require('./_generators/add-generator');
const addCommand = require('./_generators/add-command');
const removeCommand = require('./_generators/remove-command');


module.exports = function (plop) {

    // #region actions
    plop.setActionType('update_template', actUpdate);
    plop.setActionType('remove', remove);
    plop.setActionType('delete', del);
    plop.setActionType('add_line', addLine);
    plop.setActionType('remove_line', removeLine);
    // #endregion actions

    // #region generators
	plop.setGenerator('remove-generator', removeGenerator);
    plop.setGenerator('update-template', genUpdate);
    plop.setGenerator('remove-command-option', removeCommandOption);
    plop.setGenerator('add-command-option', addCommandOption);
    plop.setGenerator('add-generator', addGenerator);
    plop.setGenerator('add-command', addCommand);
    plop.setGenerator('remove-command', removeCommand);
    // #endregion generators
};
