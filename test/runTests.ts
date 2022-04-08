import { runTests } from '@vscode/test-electron';
import { resolve } from 'path';

(async function go() {
    const projectPath = resolve(__dirname, '../../');
    const extensionDevelopmentPath = projectPath;
    const extensionTestsPath = resolve(projectPath, './dist/test');
    const testWorkspace = resolve(projectPath, './test-workspace');

    try {
        await runTests({
            version: 'insiders',
            extensionDevelopmentPath,
            extensionTestsPath,
            launchArgs: [testWorkspace],
        });
    } catch (error) {
        console.error(error);
        console.error('Failed to run tests');
        process.exit(1);
    }
})();
