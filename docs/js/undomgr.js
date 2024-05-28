// Generic undo manager using the command pattern
export class UndoManager {
  constructor() {
    this.clear();
  }

  clear() {
    this._actions = [];
    this._curAction = -1;
  }

  add(action) {
    // Append new action
    this._curAction++;
    this._actions[this._curAction] = action;

    // Prune remaining undo list when adding a new action
    if (this._actions[this._curAction + 1]) {
      this._actions.splice(this._curAction + 1);
    }
  }

  undo() {
    if (this.hasUndo()) {
      // Return the current action and move backwards
      return this._actions[this._curAction--];
    }
    return null;
  }

  redo() {
    if (this.hasRedo()) {
      // Move forward to next action and return it
      return this._actions[++this._curAction];
    }
    return null;
  }

  hasUndo() {
    return this._curAction >= 0;
  }

  hasRedo() {
    return this._curAction < this._actions.length - 1;
  }
}
