const express = require('express');
const app = express();
const PORT = 6969;
const { createSSH, createVMess, createTrojan, createVLESS } = require('fightertunnel');

app.use(express.json());

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || authHeader !== 'KEPO NING SIA') {
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

app.post('/vps/sshvpn', authMiddleware, (req, res) => {
  const { username, password, expired, limitip } = req.body;
  
  createSSH(username, password, expired, limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      password: result.data.password,
      expired: result.data.expired,
      limitip: result.data.ip_limit,
      domain: result.data.domain,
      payloadws: {
        payloadcdn: "GET / HTTP/1.1[crlf]Host: " + result.data.domain + "[crlf]Upgrade: websocket[crlf][crlf]",
        payloadwithpath: "GET / HTTP/1.1[crlf]Host: " + result.data.domain + "[crlf]Upgrade: websocket[crlf]Connection: Upgrade[crlf][crlf]"
      }
    };

    res.json(data);
  });
});

app.post('/vps/vmessws', authMiddleware, (req, res) => {
  const { username, expired, limitip } = req.body;
  
  createVMess(username, expired, '100', limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      uuid: result.data.uuid,
      expired: result.data.expired,
      port: {
        tls: 443,
        none: 80
      },
      path: {
        stn: '/vmess',
        multi: '/whatever/vmess'
      },
      link: {
        tls: result.data.vmess_tls_link,
        none: result.data.vmess_nontls_link
      }
    };

    res.json(data);
  });
});

app.post('/vps/vmessgrpc', authMiddleware, (req, res) => {
  const { username, expired, limitip } = req.body;
  
  createVMess(username, expired, '100', limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      uuid: result.data.uuid,
      expired: result.data.expired,
      port: {
        tls: 443
      },
      path: {
        stn: 'vmess-grpc',
        multi: 'vmess-grpc'
      },
      link: {
        tls: result.data.vmess_grpc_link
      }
    };

    res.json(data);
  });
});

app.post('/vps/trojanws', authMiddleware, (req, res) => {
  const { username, expired, limitip } = req.body;
  
  createTrojan(username, expired, '100', limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      uuid: result.data.uuid,
      expired: result.data.expired,
      port: {
        tls: 443
      },
      path: {
        stn: '/trojan-ws',
        multi: '/whatever/trojan-ws'
      },
      link: {
        tls: result.data.trojan_tls_link
      }
    };

    res.json(data);
  });
});

app.post('/vps/trojangrpc', authMiddleware, (req, res) => {
  const { username, expired, limitip } = req.body;
  
  createTrojan(username, expired, '100', limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      uuid: result.data.uuid,
      expired: result.data.expired,
      port: {
        tls: 443
      },
      path: {
        stn: 'trojan-grpc',
        multi: 'trojan-grpc'
      },
      link: {
        tls: result.data.trojan_grpc_link
      }
    };

    res.json(data);
  });
});

app.post('/vps/vlessws', authMiddleware, (req, res) => {
  const { username, expired, limitip } = req.body;
  
  createVLESS(username, expired, '100', limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      uuid: result.data.uuid,
      expired: result.data.expired,
      port: {
        tls: 443,
        none: 80
      },
      path: {
        stn: '/vless',
        multi: '/whatever/vless'
      },
      link: {
        tls: result.data.vless_tls_link,
        none: result.data.vless_nontls_link
      }
    };

    res.json(data);
  });
});

app.post('/vps/vlessgrpc', authMiddleware, (req, res) => {
  const { username, expired, limitip } = req.body;
  
  createVLESS(username, expired, '100', limitip, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const data = {
      username: result.data.username,
      uuid: result.data.uuid,
      expired: result.data.expired,
      port: {
        tls: 443
      },
      path: {
        stn: 'vless-grpc',
        multi: 'vless-grpc'
      },
      link: {
        tls: result.data.vless_grpc_link
      }
    };

    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
