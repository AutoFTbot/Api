   const express = require('express');
   const { createSSH, createTrojan, createVLESS, createShadowsocks, createVMess } = require('fightertunnel');
   const app = express();

   app.use(express.json());

   const allowedIPs = ['192.168.1.1', '203.0.113.0']; // Daftar IP yang diizinkan

   function checkIP(req, res, next) {
       const clientIP = req.ip;
       if (!allowedIPs.includes(clientIP)) {
           return res.status(403).json({ error: 'IP tidak diizinkan' });
       }
       next();
   }

   app.post('/create-ssh', checkIP, (req, res) => {
       const { username, password, expiry, iplimit } = req.body;

       if (!username || !password || !expiry || !iplimit) {
           return res.status(400).json({ error: 'Semua parameter diperlukan' });
       }

       createSSH(username, password, expiry, iplimit, (err, result) => {
           if (err) {
               return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
           }
           res.status(200).json({ message: 'Akun SSH berhasil dibuat', data: result });
       });
   });
   app.post('/create-vmess', checkIP, (req, res) => {
       const { username, expiry, quota, iplimit } = req.body;

       if (!username || !expiry || !quota || !iplimit) {
           return res.status(400).json({ error: 'Semua parameter diperlukan' });
       }

       createVMess(username, expiry, quota, iplimit, (err, result) => {
           if (err) {
               return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
           }
           res.status(200).json({ message: 'Akun VMess berhasil dibuat', data: result });
       });
   });

   app.post('/create-trojan', checkIP, (req, res) => {
       const { username, expiry, quota, iplimit } = req.body;

       if (!username || !expiry || !quota || !iplimit) {
           return res.status(400).json({ error: 'Semua parameter diperlukan' });
       }

       createTrojan(username, expiry, quota, iplimit, (err, result) => {
           if (err) {
               return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
           }
           res.status(200).json({ message: 'Akun Trojan berhasil dibuat', data: result });
       });
   });
   app.post('/create-vless', checkIP, (req, res) => {
       const { username, expiry, quota, iplimit } = req.body;

       if (!username || !expiry || !quota || !iplimit) {
           return res.status(400).json({ error: 'Semua parameter diperlukan' });
       }

       createVLESS(username, expiry, quota, iplimit, (err, result) => {
           if (err) {
               return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
           }
           res.status(200).json({ message: 'Akun VLESS berhasil dibuat', data: result });
       });
   });
   app.post('/create-shadowsocks', checkIP, (req, res) => {
       const { username, expiry, quota, iplimit } = req.body;

       if (!username || !expiry || !quota || !iplimit) {
           return res.status(400).json({ error: 'Semua parameter diperlukan' });
       }

       createShadowsocks(username, expiry, quota, iplimit, (err, result) => {
           if (err) {
               return res.status(500).json({ error: 'Terjadi kesalahan', details: err });
           }
           res.status(200).json({ message: 'Akun Shadowsocks berhasil dibuat', data: result });
       });
   });

   const PORT = process.env.PORT || 3000;
   app.listen(PORT, () => {
       console.log(`Server berjalan di port ${PORT}`);
   });
