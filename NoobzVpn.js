const express = require('express');
const { exec } = require('child_process');
const app = express();
const PORT = 6969;

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== '#') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.get('/vps/detailport', authMiddleware, (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running'
  });
});

app.post('/nobzvpn/add', authMiddleware, (req, res) => {
  const { username, password, expired } = req.body;

  if (!username || !password || !expired) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const command = `noobzvpns -j add ${username} -p ${password} -e ${expired}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    try {
      const result = JSON.parse(stdout);
      if (result[0]?.Add?.error) {
        return res.status(500).json({ error: result[0].Add.error });
      }
      const host = '[host]';
      const ua = '[ua]';
      const payload = `GET / HTTP/1.1[crlf]Host: ${host}[crlf]Connection: Upgrade[crlf]User-Agent: ${ua}[crlf]Upgrade: websocket[crlf][crlf]`;
      res.json({
        username,
        password,
        expired,
        payload: {
          payload: payload
        }
      });
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError);
      res.status(500).json({ error: 'Failed to parse response' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`NoBZVPN API berjalan di port ${PORT}`);
});
