export declare type ModelSetDetail = {
    complete: boolean;
    component: any;
    hasModel: boolean;
};
export declare class ModelSetEvent extends CustomEvent<ModelSetDetail> {
    readonly component: string;
    readonly complete: boolean;
    static TYPE: string;
    constructor(component: string, complete: boolean, hasModel: boolean);
}
export declare type DeleteDone = (e?: Error) => void;
export declare type SessionChangedDetail = {
    complete: boolean;
    component: any;
};
export declare class SessionChangedEvent extends CustomEvent<SessionChangedDetail> {
    readonly component: string;
    readonly complete: boolean;
    static TYPE: string;
    constructor(component: string, complete: boolean);
}
