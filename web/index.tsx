import { createRoot } from 'react-dom/client';
import App from './App';
import './index.less';

if (window.__vscode__ === undefined) {
    window.__vscode__ = acquireVsCodeApi();
}

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(<App />);
