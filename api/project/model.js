const db = require('../../data/db-config');

function getProjects() {
  return db('projects').select('*').then(projects =>
    projects.map(project => ({
      ...project,
      project_completed: Boolean(project.project_completed)
    }))
  );
}

function createProject(project) {
  return db('projects')
    .insert(project)
    .then(([id]) => db('projects').where('project_id', id).first())
    .then(project => ({
      ...project,
      project_completed: Boolean(project.project_completed)
    }));
}

module.exports = {
  getProjects,
  createProject,
};
