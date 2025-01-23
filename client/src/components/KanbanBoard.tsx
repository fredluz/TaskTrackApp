import { useState, useEffect } from 'react';
import './KanbanBoard.css';
import axios from 'axios';
import TaskColumn from './TaskColumn';
import SkeletonLoader from './SkeletonLoader';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
}

const KanbanBoard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('http://localhost:5000/api/tasks', {
          signal: abortController.signal
        });
        setTasks(response.data);
        setLoading(false);
    } catch (error: unknown) {
        if (!axios.isCancel(error)) {
          console.error('Error fetching tasks:', error);
          setLoading(false);
        }
      }
    };
    
    fetchTasks();
    return () => abortController.abort();
  }, []);

  if (loading) return <SkeletonLoader columns={3} />;

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map((task: Task) => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };


  return (
    <div className="kanban-board">
      <TaskColumn 
        title="To Do"
        tasks={tasks.filter(task => task.status === 'todo')}
        onStatusChange={handleStatusChange}
        allowedStatuses={['in_progress']}
      />
      <TaskColumn
        title="In Progress"
        tasks={tasks.filter(task => task.status === 'in_progress')}
        onStatusChange={handleStatusChange}
        allowedStatuses={['todo', 'done']}
      />
      <TaskColumn
        title="Done"
        tasks={tasks.filter(task => task.status === 'done')}
        onStatusChange={handleStatusChange}
        allowedStatuses={['in_progress']}
      />
    </div>
  );
};

export default KanbanBoard;
