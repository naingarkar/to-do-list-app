import { createRoot } from 'react-dom/client';
import TaskList from './pages/tasks';


if (document.getElementById('app')) {
    const container = document.getElementById('app');
    const root = createRoot(container);
    root.render(<TaskList/>);
}