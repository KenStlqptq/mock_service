module server {
    export enum serverStatus{
        stop,
        fail,
        running,
    };
    export abstract class CBaseServer {
        constructor() {}
        protected abstract _beforeInit():boolean;
        protected abstract _init():boolean;
        protected abstract _checkStart():boolean;
        protected abstract _start():boolean;
        protected abstract _startFinish():boolean;
        protected abstract _ServerEnter():boolean;
        protected abstract _ServerLeave():boolean;
    }

}
export = server.CBaseServer;