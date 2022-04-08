export enum ReceivedCommand {}

export enum SendedCommand {}

export interface MessageData<T> {
    command: `webviewBoilerplate.${string}`;
    data: T;
}

export function send<T>(command: string, data?: MessageData<T>) {
    window.__vscode__.postMessage({
        command: `webviewBoilerplate.${command}`,
        data,
    });
}
