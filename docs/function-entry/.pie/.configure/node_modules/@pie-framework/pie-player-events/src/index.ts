export type ModelSetDetail = {
  complete: boolean,
  component: any,
  hasModel: boolean
};

export class ModelSetEvent extends CustomEvent<ModelSetDetail> {

  static TYPE = 'model-set';

  constructor(readonly component: string, readonly complete: boolean, hasModel: boolean) {

    //TODO: composed isnt in the CustomEvent def yet so casting as any for now.
    super(ModelSetEvent.TYPE, { bubbles: true, composed: true, detail: { complete, component, hasModel } } as any);
  }
}

export type DeleteDone = (e?: Error) => void;

export type SessionChangedDetail = {
  complete: boolean;
  component: any
};

export class SessionChangedEvent extends CustomEvent<SessionChangedDetail> {

  static TYPE = 'session-changed';

  constructor(readonly component: string, readonly complete: boolean) {
    //TODO: composed isnt in the CustomEvent def yet so casting as any for now.
    super(SessionChangedEvent.TYPE, { bubbles: true, composed: true, detail: { complete, component } } as any);
  }
}

