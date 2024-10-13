#!/bin/bash

read -p "Masukkan IP yang diizinkan (pisahkan dengan koma jika lebih dari satu): " ALLOWED_IPS

read -p "Masukkan port yang akan digunakan: " PORT

if [[ -z "$PORT" ]]; then
    echo "Port tidak boleh kosong. Silakan jalankan kembali script dan masukkan port yang valid."
    exit 1
fi

export ALLOWED_IPS
export PORT

cat >/etc/systemd/system/api.service << EOF
[Unit]
Description=API Service
After=network.target

[Service]
WorkingDirectory=/root/Api
ExecStart=/usr/bin/env node /root/Api/apiV2.js
Environment=ALLOWED_IPS=$ALLOWED_IPS
Environment=PORT=$PORT
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl restart api
systemctl enable api

systemctl status api
