"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelSetEvent extends CustomEvent {
    constructor(component, complete, hasModel) {
        super(ModelSetEvent.TYPE, { bubbles: true, composed: true, detail: { complete, component, hasModel } });
        this.component = component;
        this.complete = complete;
    }
}
ModelSetEvent.TYPE = 'model-set';
exports.ModelSetEvent = ModelSetEvent;
class SessionChangedEvent extends CustomEvent {
    constructor(component, complete) {
        super(SessionChangedEvent.TYPE, { bubbles: true, composed: true, detail: { complete, component } });
        this.component = component;
        this.complete = complete;
    }
}
SessionChangedEvent.TYPE = 'session-changed';
exports.SessionChangedEvent = SessionChangedEvent;
//# sourceMappingURL=index.js.map