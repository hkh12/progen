const gittar = require('gittar');

/**
 * @param {string} path `username + '/' + repository`
 * @param {string} target Output directory
 */
module.exports = async function cloneRepo(path, target) {
  const [username, repo] = path.split('/');
  const src = await gittar.fetch(`${username}/${repo}`);
  await gittar.extract(src, target, {
    filter: () => true
  });
};
