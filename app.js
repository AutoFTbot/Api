require('dotenv').config();
const express = require('express');
const fightertunnel = require('fightertunnel');

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

const validateParams = (params, body, res) => {
    const missingParams = params.filter(param => !body[param]);
    if (missingParams.length) {
        return res.status(400).json({ error: `Parameter berikut diperlukan: ${missingParams.join(', ')}` });
    }
    return true;
};

const createHandler = (action) => (req, res) => {
    const { username, expiry, quota, iplimit } = req.body;
    const params = ['username', 'expiry', 'quota', 'iplimit'];

    if (!validateParams(params, req.body, res)) return;

    fightertunnel[action](username, expiry, quota, iplimit, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
        }
        res.status(200).json({ data: result });
    });
};

const services = ['ssh', 'vmess', 'trojan', 'vless', 'shadowsocks'];
services.forEach(service => {
    app.post(`/create-${service}`, createHandler(`create${service.charAt(0).toUpperCase() + service.slice(1)}`));
    app.post(`/renew-${service}`, createHandler(`renew${service.charAt(0).toUpperCase() + service.slice(1)}`));
    app.post(`/trial-${service}`, (req, res) => {
        fightertunnel[`trial${service.charAt(0).toUpperCase() + service.slice(1)}`]((err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Terjadi kesalahan', details: err.message });
            }
            res.status(200).json({ data: result });
        });
    });
    app.post(`/delete-${service}`, (req, res) => {
        const { username } = req.body;
        if (!username) {
            return res.status(400).json({ error: 'Username diperlukan' });
        }
        fightertunnel[`delete${service.charAt(0).toUpperCase() + service.slice(1)}`](username, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
            }
            res.status(200).json({ data: result });
        });
    });
});

app.post('/check/:service', (req, res) => {
    const service = req.params.service.toLowerCase();
    const checkFunction = fightertunnel[`check${service.charAt(0).toUpperCase() + service.slice(1)}`];

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

const PORT = process.env.PORT;
if (!PORT) {
    console.error("Port tidak ditentukan. Pastikan file .env sudah terisi dengan benar.");
    process.exit(1);
}

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
