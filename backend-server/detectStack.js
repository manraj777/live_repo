const fs = require('fs');
const path = require('path');

function detectStack(dir) {
  const files = fs.readdirSync(dir);
  const stack = [];

  if (files.includes('package.json')) stack.push('Node.js');
  if (files.includes('requirements.txt')) stack.push('Python');
  if (files.includes('manage.py')) stack.push('Django');
  if (files.includes('app.py')) stack.push('Flask');
  if (files.includes('index.html')) stack.push('HTML/Static Site');
  if (files.includes('Dockerfile')) stack.push('Docker');

  return stack;
}

module.exports = detectStack;
