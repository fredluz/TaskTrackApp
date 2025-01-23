from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Task
import uuid
from config import Config

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})  # Update with your Vite dev server port
app.config.from_object(Config)

# Initialize database
with app.app_context():
    db.init_app(app)

@app.route('/api/tasks')
def get_tasks():
    tasks = Task.query.all()
    return jsonify([{
        'id': task.id,
        'title': task.title,
        'description': task.description,
        'status': task.status
    } for task in tasks])

@app.route('/api/tasks/<task_id>', methods=['PATCH'])
def update_task(task_id):
    task = Task.query.get_or_404(task_id)
    new_status = request.json.get('status')
    
    if new_status not in ['todo', 'in_progress', 'done']:
        return jsonify({'error': 'Invalid status'}), 400
        
    task.status = new_status
    db.session.commit()
    return jsonify({'message': 'Task updated successfully'})

@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json
    if not data.get('title'):
        return jsonify({'error': 'Title is required'}), 400
        
    new_task = Task(
        id=str(uuid.uuid4()),
        title=data['title'],
        description=data.get('description', ''),
        status='todo'
    )
    
    db.session.add(new_task)
    db.session.commit()
    return jsonify({
        'id': new_task.id,
        'title': new_task.title,
        'description': new_task.description,
        'status': new_task.status
    }), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
