#!/bin/bash
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m'

print_line() {
    echo -e "${BLUE}----------------------------------------${NC}"
}

clear
echo -e "${CYAN}"
print_line
echo -e "       🚀 ${WHITE}API Service Setup Script${CYAN} 🚀"
print_line
echo -e "${NC}"

echo -e "${YELLOW}Step 1: Masukkan IP yang diizinkan${NC}"
echo -e "${WHITE}Pisahkan dengan koma jika lebih dari satu (contoh: 192.168.1.1,192.168.1.2)${NC}"
read -p "> " ALLOWED_IPS

echo -e "\n${YELLOW}Step 2: Masukkan port yang akan digunakan${NC}"
read -p "> " PORT

if [[ -z "$PORT" ]]; then
    echo -e "\n${RED}⚠️  Port tidak boleh kosong! Jalankan ulang script dan masukkan port yang valid.${NC}"
    exit 1
fi

echo -e "\n${CYAN}Konfigurasi Anda:${NC}"
print_line
echo -e "${WHITE}ALLOWED_IPS: ${GREEN}$ALLOWED_IPS${NC}"
echo -e "${WHITE}PORT       : ${GREEN}$PORT${NC}"
print_line

read -p "Apakah konfigurasi sudah benar? (y/n): " CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
    echo -e "${RED}❌ Konfigurasi dibatalkan. Tidak ada perubahan yang dibuat.${NC}"
    exit 1
fi

echo -e "\n${BLUE}📂 Membuat file konfigurasi .env...${NC}"
cat >/root/Api/.env << EOF
ALLOWED_IPS=$ALLOWED_IPS
PORT=$PORT
EOF

echo -e "${BLUE}📂 Membuat file service systemd...${NC}"
cat >/etc/systemd/system/api.service << EOF
[Unit]
Description=API Service
After=network.target

[Service]
WorkingDirectory=/root/Api
ExecStart=/usr/bin/env node /root/Api/apiV2.js
Restart=always

[Install]
WantedBy=multi-user.target
EOF

echo -e "${BLUE}🔄 Reload systemd dan mulai service...${NC}"
systemctl daemon-reload
systemctl restart api
systemctl enable api

echo -e "\n${GREEN}✅ Service API berhasil dikonfigurasi! Berikut statusnya:${NC}"
print_line
systemctl status api --no-pager
print_line

echo -e "${CYAN}✨ Setup selesai! Anda dapat mulai menggunakan API di port ${WHITE}$PORT${CYAN}.${NC}"
