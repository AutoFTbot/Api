# API VPN Management

API ini menyediakan endpoint untuk membuat berbagai jenis akun VPN, termasuk SSH, Trojan, VLESS, dan Shadowsocks. API ini dibangun menggunakan Express.js dan mengandalkan modul `fightertunnel` untuk pembuatan akun.

## Prasyarat

- Node.js
- NPM

## Instalasi

1. Clone repositori ini.
2. Jalankan perintah berikut untuk menginstal dependensi:

   ```bash
   npm install
   ```

3. Jalankan server dengan perintah:

   ```bash
   node api.js
   ```

## Endpoint

### Membuat Akun SSH

- **URL**: `/create-ssh`
- **Method**: `POST`
- **Body Parameters**:
  - `username` (string): Nama pengguna untuk akun SSH.
  - `password` (string): Kata sandi untuk akun SSH.
  - `expiry` (number): Masa aktif akun dalam hari.
  - `iplimit` (number): Batas IP yang diizinkan.

- **Response**:
  - `200 OK`: Akun SSH berhasil dibuat.
  - `400 Bad Request`: Parameter tidak lengkap.
  - `500 Internal Server Error`: Terjadi kesalahan saat membuat akun.

### Membuat Akun Trojan

- **URL**: `/create-trojan`
- **Method**: `POST`
- **Body Parameters**:
  - `username` (string): Nama pengguna untuk akun Trojan.
  - `expiry` (number): Masa aktif akun dalam hari.
  - `quota` (number): Kuota data dalam GB.
  - `iplimit` (number): Batas IP yang diizinkan.

- **Response**:
  - `200 OK`: Akun Trojan berhasil dibuat.
  - `400 Bad Request`: Parameter tidak lengkap.
  - `500 Internal Server Error`: Terjadi kesalahan saat membuat akun.

### Membuat Akun VLESS

- **URL**: `/create-vless`
- **Method**: `POST`
- **Body Parameters**:
  - `username` (string): Nama pengguna untuk akun VLESS.
  - `expiry` (number): Masa aktif akun dalam hari.
  - `quota` (number): Kuota data dalam GB.
  - `iplimit` (number): Batas IP yang diizinkan.

- **Response**:
  - `200 OK`: Akun VLESS berhasil dibuat.
  - `400 Bad Request`: Parameter tidak lengkap.
  - `500 Internal Server Error`: Terjadi kesalahan saat membuat akun.

### Membuat Akun Shadowsocks

- **URL**: `/create-shadowsocks`
- **Method**: `POST`
- **Body Parameters**:
  - `username` (string): Nama pengguna untuk akun Shadowsocks.
  - `expiry` (number): Masa aktif akun dalam hari.
  - `quota` (number): Kuota data dalam GB.
  - `iplimit` (number): Batas IP yang diizinkan.

- **Response**:
  - `200 OK`: Akun Shadowsocks berhasil dibuat.
  - `400 Bad Request`: Parameter tidak lengkap.
  - `500 Internal Server Error`: Terjadi kesalahan saat membuat akun.

## Menjalankan Server

Server akan berjalan pada port yang ditentukan dalam variabel lingkungan `PORT` atau default pada port 3000. Anda dapat mengakses API melalui `http://localhost:3000`.

## Kontribusi

Silakan buat pull request atau buka issue untuk kontribusi atau perbaikan.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT.
