const fs = require('fs');
const path = require('path');

function generateDockerfile(projectPath, stack) {
  let dockerfileContent = '';

  if (stack.includes('Node.js')) {
    dockerfileContent = `
FROM node:18

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "start"]
`.trim();
  } else if (stack.includes('Flask')) {
    dockerfileContent = `
FROM python:3.10

WORKDIR /app
COPY . .
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python", "app.py"]
`.trim();
  } else {
    // fallback: static site
    dockerfileContent = `
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
`.trim();
  }

  const dockerfilePath = path.join(projectPath, 'Dockerfile');
  fs.writeFileSync(dockerfilePath, dockerfileContent);
}

module.exports = generateDockerfile;
