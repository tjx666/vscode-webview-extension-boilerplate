import * as vscode from 'vscode';
import configuration from './configuration';

export function activate(context: vscode.ExtensionContext): void {
    configuration.update(context);

    context.subscriptions.push(
        vscode.commands.registerCommand('webviewBoilerplate.helloWorld', () => {
            import('./webview').then(({ MyWebview }) => {
                MyWebview.createOrShow(context.extensionUri);
            });
        }),
        vscode.workspace.onDidChangeConfiguration(() => {
            configuration.update(context);
        }),
    );
}

export function deactivate(): void {
    // recycle resource...
}
