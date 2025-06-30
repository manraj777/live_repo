const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const detectStack = require('./detectStack');
const generateDockerfile = require('./generateDockerfile');
const { v4: uuidv4 } = require('uuid');
const localtunnel = require('localtunnel');

async function runProject(repoUrl) {
  const id = uuidv4();
  const clonePath = path.join(__dirname, 'tempRepos', id); // ✅ defined before use

  // Step 1: Clone the repo
  await simpleGit().clone(repoUrl, clonePath);

  // Step 2: Detect the stack
  const stack = detectStack(clonePath); // ✅ now clonePath is available

  // Step 3: Generate Dockerfile (if not already)
  if (!fs.existsSync(path.join(clonePath, 'Dockerfile'))) {
    generateDockerfile(clonePath, stack);
  }

  // Step 4: Docker build & run
  const port = 3000 + Math.floor(Math.random() * 1000);
  const buildCmd = `docker build -t ${id} "${clonePath}"`;
  const runCmd = `docker run -d -p ${port}:3000 --name ${id} ${id}`;

  await execPromise(`${buildCmd} && ${runCmd}`);

  // Step 5: Open tunnel
  const tunnel = await localtunnel({ port });

  return {
    previewUrl: tunnel.url,
    stack
  };
}

function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) reject(stderr);
      else resolve(stdout);
    });
  });
}

module.exports = runProject;
