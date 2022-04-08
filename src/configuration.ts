import { ExtensionContext } from 'vscode';

class Configuration {
    static configuration = new Configuration();
    globalStoragePath = '';

    private constructor() {
        this.update();
    }

    update(extensionContext?: ExtensionContext) {
        // const latestConfiguration = vscode.workspace.getConfiguration('webviewBoilerplate');
        if (extensionContext) {
            this.globalStoragePath = extensionContext.globalStorageUri.fsPath;
            // this.xxx = latestConfiguration.get('xxx')!;
        }
    }
}

export default Configuration.configuration;
