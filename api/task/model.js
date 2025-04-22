const db = require('../../data/dbConfig');

function getTasks() {
  return db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select(
      't.task_id',
      't.task_description',
      't.task_notes',
      't.task_completed',
      'p.project_name',
      'p.project_description'
    )
    .then(tasks =>
      tasks.map(task => ({
        ...task,
        task_completed: Boolean(task.task_completed)
      }))
    );
}

function createTask(task) {
  return db('tasks')
    .insert(task)
    .then(([id]) => db('tasks').where('task_id', id).first())
    .then(async task => {
      const project = await db('projects').where('project_id', task.project_id).first();
      return {
        ...task,
        task_completed: Boolean(task.task_completed),
        project_name: project.project_name,
        project_description: project.project_description,
      };
    });
}

module.exports = {
  getTasks,
  createTask,
};

