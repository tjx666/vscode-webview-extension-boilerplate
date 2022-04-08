import vscode from 'vscode';

import { __DEV__ } from './constants';
import { getNonce } from './utils';

export class MyWebview {
    public static readonly viewType = 'WebviewBoilerplate';
    public static currentMyWebview: MyWebview | undefined;

    private readonly extensionUri: vscode.Uri;
    private readonly disposables: vscode.Disposable[] = [];
    private panel: vscode.WebviewPanel | undefined;
    private html = '';

    public static createOrShow(extensionUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (MyWebview.currentMyWebview) {
            MyWebview.currentMyWebview.panel!.reveal(column);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            MyWebview.viewType,
            'Webview Boilerplate',
            column ?? vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [extensionUri],
                retainContextWhenHidden: true,
            },
        );

        MyWebview.currentMyWebview = new MyWebview(panel, extensionUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this.panel = panel;
        this.extensionUri = extensionUri;

        // setup listeners
        this.panel.onDidDispose(() => this.dispose(), this, this.disposables);
        this.panel.webview.onDidReceiveMessage(this.handleWebViewMessage, this, this.disposables);

        // Set the webview's initial html content
        this.setupHtmlForWebview(this.panel.webview);
    }

    private async handleWebViewMessage(message: any) {
        switch (message.command) {
            case 'webpack.reload':
                vscode.commands.executeCommand('workbench.action.webview.reloadWebviewAction');
                return;
        }
    }

    private setupHtmlForWebview(webview: vscode.Webview) {
        const scriptSrc = __DEV__
            ? 'http://localhost:3000/webview.js'
            : webview.asWebviewUri(
                  vscode.Uri.joinPath(this.extensionUri, 'dist', 'web', 'webview.js'),
              );
        const nonce = getNonce();
        const nonceAttr = __DEV__ ? '' : `nonce="${nonce}"`;
        const cspMeta = __DEV__
            ? ''
            : `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}';">`;

        this.html = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        ${cspMeta}
        <title>Webview Boilerplate</title>
    </head>
    <body>
        <div id="root"></div>
        <script ${nonceAttr} src="${scriptSrc}"></script>
    </body>
</html>`;
        if (this.panel?.webview) {
            this.panel.webview.html = this.html;
        }
    }

    private dispose() {
        MyWebview.currentMyWebview = undefined;
        this.panel = undefined;

        while (this.disposables.length > 0) {
            const x = this.disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
}
