import KanbanBoard from './components/KanbanBoard.tsx';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Sprint Board</h1>
      <KanbanBoard />
    </div>
  );
};

export default App;
