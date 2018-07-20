export declare type ModelUpdatedDetail = {
    update: any;
    reset: boolean;
};
export declare class ModelUpdatedEvent extends CustomEvent<ModelUpdatedDetail> {
    readonly update: any;
    readonly reset: boolean;
    static TYPE: string;
    constructor(update: any, reset?: boolean);
}
export declare type DeleteDone = (e?: Error) => void;
export declare type DeleteImageDetail = {
    src: string;
    done: DeleteDone;
};
export declare class DeleteImageEvent extends CustomEvent<DeleteImageDetail> {
    readonly src: string;
    readonly done: DeleteDone;
    static TYPE: string;
    constructor(src: string, done: DeleteDone);
}
export interface ImageHandler {
    cancel: () => void;
    done: (err?: Error, src?: string) => void;
    fileChosen: (file: File) => void;
    progress: (percent: number, bytes: number, total: number) => void;
}
export declare class InsertImageEvent extends CustomEvent<ImageHandler> {
    readonly handler: ImageHandler;
    static TYPE: string;
    constructor(handler: ImageHandler);
}
