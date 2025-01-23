import type { Task } from './KanbanBoard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: Task['status']) => void;
  allowedStatuses: Task['status'][];
}

const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title,
  tasks,
  onStatusChange,
  allowedStatuses
}) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
            <div className="status-actions">
              {allowedStatuses.map(status => (
                <button
                  key={status}
                  onClick={() => onStatusChange(task.id, status)}
                >
                  Mark as {status.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
