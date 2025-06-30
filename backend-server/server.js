const express = require('express');
const bodyParser = require('body-parser');
const runProject = require('./runproject'); // Ensure the filename is 'runProject.js' with matching casing

const app = express();
app.use(bodyParser.json());

app.post('/api/run', async (req, res) => {
  const { repoUrl } = req.body;
  if (!repoUrl || !repoUrl.startsWith('https://github.com')) {
    return res.status(400).json({ error: 'Invalid GitHub URL' });
  }

  try {
    const result = await runProject(repoUrl);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to run project' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
