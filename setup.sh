#!/bin/bash

read -p "Masukkan IP yang diizinkan (pisahkan dengan koma jika lebih dari satu): " ALLOWED_IPS

export ALLOWED_IPS

cat >/etc/systemd/system/api.service << EOF
[Unit]
Description=API Service
After=network.target

[Service]
WorkingDirectory=/root/api
ExecStart=/usr/bin/env node /root/Api/apiV2.js
Environment=ALLOWED_IPS=$ALLOWED_IPS
Restart=always

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl restart api
systemctl enable api

systemctl status api