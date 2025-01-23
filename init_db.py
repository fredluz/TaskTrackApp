from app import app
from models import db, Task, Project
import uuid

def init_db():
    with app.app_context():
        # Create all tables
        db.create_all()
        
        # Clear existing data
        Task.query.delete()
        Project.query.delete()
        
        # Create default project
        default_project = Project(name="Default Project", key="DEF")
        db.session.add(default_project)
        db.session.flush()  # This gets us the project ID
        
        # Create sample tasks
        sample_tasks = [
            Task(
                id=str(uuid.uuid4()),
                title="Implement user authentication",
                description="Add login/signup functionality with JWT",
                status="todo",
                project_id=default_project.id
            ),
            Task(
                id=str(uuid.uuid4()),
                title="Design homepage layout",
                description="Create responsive layout for main dashboard",
                status="in_progress",
                project_id=default_project.id
            ),
            Task(
                id=str(uuid.uuid4()),
                title="Setup CI/CD pipeline",
                description="Configure GitHub Actions for automated testing",
                status="done",
                project_id=default_project.id
            ),
            Task(
                id=str(uuid.uuid4()),
                title="Write API documentation",
                description="Create Swagger/OpenAPI documentation",
                status="todo",
                project_id=default_project.id
            ),
        ]
        
        db.session.bulk_save_objects(sample_tasks)
        db.session.commit()
        print(f"Database initialized with {len(sample_tasks)} sample tasks")

if __name__ == "__main__":
    try:
        init_db()
    except Exception as e:
        print(f"Error initializing database: {e}")
