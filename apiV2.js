require('dotenv').config();
const express = require('express');
const { 
    createSSH, 
    createTrojan, 
    createVLESS, 
    createShadowsocks, 
    createVMess, 
    checkSSH, 
    checkVMess, 
    checkTrojan, 
    checkVLESS, 
    checkShadowsocks,
    renewSSH,
    renewVMess,
    renewTrojan,
    renewVLESS,
    renewShadowsocks,
    trialSSH,
    trialTrojan,
    trialVMess,
    trialVLess,
    trialShadowsocks,
    deleteSSH,
    deleteVMess,
    deleteTrojan,
    deleteVLESS,
    deleteShadowsocks
} = require('fightertunnel');

const app = express();

app.use(express.json());

const allowedIPs = process.env.ALLOWED_IPS ? process.env.ALLOWED_IPS.split(',') : [];

app.use((req, res, next) => {
    const clientIP = req.ip.includes('::ffff:') ? req.ip.split('::ffff:')[1] : req.ip;
    console.log(`Client IP: ${clientIP}`); 
    if (!allowedIPs.includes(clientIP)) {
        return res.status(403).json({ error: 'Akses ditolak' });
    }
    next();
});

app.post('/create-ssh', (req, res) => {
    const { username, password, expiry, iplimit } = req.body;

    if (!username || !password || !expiry || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    createSSH(username, password, expiry, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/create-vmess', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    createVMess(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/create-trojan', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    createTrojan(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/create-vless', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    createVLESS(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/create-shadowsocks', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    createShadowsocks(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/check/:service', (req, res) => {
    const service = req.params.service.toLowerCase();
    const checkFunctions = {
        ssh: checkSSH,
        vmess: checkVMess,
        trojan: checkTrojan,
        vless: checkVLESS,
        shadowsocks: checkShadowsocks
    };

    const checkFunction = checkFunctions[service];

    if (!checkFunction) {
        return res.status(400).json({ error: 'Layanan tidak valid' });
    }

    checkFunction((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        if (!result || !result.data || result.data.length === 0) {
            return res.status(200).json({ status: 'success', data: '⚠️ Tidak ada yang login' });
        }
        const uniqueData = Array.from(new Set(result.data.map(JSON.stringify))).map(JSON.parse);
        res.status(200).json({ status: 'success', data: uniqueData });
    });
});

app.post('/renew-ssh', (req, res) => {
    const { username, expiry, iplimit } = req.body;

    if (!username || !expiry || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    renewSSH(username, expiry, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/renew-vmess', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    renewVMess(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/renew-trojan', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    renewTrojan(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/renew-vless', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    renewVLESS(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/renew-shadowsocks', (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;

    if (!username || !expiry || !quota || !iplimit) {
        return res.status(400).json({ error: 'Semua parameter diperlukan' });
    }

    renewShadowsocks(username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/trial-ssh', (req, res) => {
    trialSSH((err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/trial-vmess', (req, res) => {
    trialVMess((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/trial-trojan', (req, res) => {
    trialTrojan((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/trial-vless', (req, res) => {
    trialVLess((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/trial-shadowsocks', (req, res) => {
    trialShadowsocks((err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/delete-ssh', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username diperlukan' });
    }

    deleteSSH(username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/delete-vmess', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username diperlukan' });
    }

    deleteVMess(username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/delete-trojan', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username diperlukan' });
    }

    deleteTrojan(username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/delete-vless', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username diperlukan' });
    }

    deleteVLESS(username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

app.post('/delete-shadowsocks', (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username diperlukan' });
    }

    deleteShadowsocks(username, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
});

const PORT = process.env.PORT;

if (!PORT) {
    console.error("Port tidak ditentukan. Pastikan file .env sudah terisi dengan benar.");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
