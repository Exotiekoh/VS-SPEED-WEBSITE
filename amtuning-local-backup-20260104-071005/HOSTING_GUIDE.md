# VSSPEED - Domain & Local Hosting Intelligence

To run **vsspeed.org** directly from your local hardware, follow these designated protocols.

---

## 🛰️ PROTOCOL A: Local Simulation (Your PC Only)
Use this to test the domain name on your own browser immediately.

1.  **Open Notepad as Administrator**.
2.  Open the file: `C:\Windows\System32\drivers\etc\hosts`
3.  Add this line to the bottom:
    ```text
    127.0.0.1 vsspeed.org
    127.0.0.1 www.vsspeed.org
    ```
4.  **Save** the file.
5.  Run the server: `npm run dev`
6.  Navigate to `http://vsspeed.org` in your browser.

---

## 🌍 PROTOCOL B: Global Deployment (Cloudflare Tunnel)
*Recommended for hosting the site from your PC securely to the public.*

### 🛠️ Prerequisites
1.  **Own the Domain**: Buy `vsspeed.org` on Namecheap, Cloudflare, or GoDaddy.
2.  **Cloudflare Account**: Add your domain to a free Cloudflare account.

### 🚀 Execution
1.  **Install Cloudflared**: Download the [Cloudflared CLI](https://github.com/cloudflare/cloudflared/releases) on your PC.
2.  **Authenticate**: 
    ```powershell
    cloudflared tunnel login
    ```
3.  **Create the Tunnel**:
    ```powershell
    cloudflared tunnel create vsspeed-mission
    ```
4.  **Route the Domain**:
    ```powershell
    cloudflared tunnel route dns vsspeed-mission vsspeed.org
    ```
5.  **Launch the Gateway**:
    Connect your local site (Port 80) to the tunnel:
    ```powershell
    cloudflared tunnel run --url http://localhost:80 vsspeed-mission
    ```

---

## 🔒 SECURITY WARNINGS
1.  **Firewall**: Ensure Windows Firewall allows traffic on Port 80 for Node.js.
2.  **Uptime**: Your PC must stay powered on for the site to remain live. If you turn off your computer, the "Global Network" goes offline.
3.  **Power Level**: For production use, consider a low-power "NUC" or "Mini-PC" dedicated to hosting, rather than your primary workstation.

---

## ⚙️ TECHNICAL SPECS (Updated)
The `vite.config.js` has been pre-configured to:
- Listen on **Port 80** (Standard Web Traffic).
- Accept **vsspeed.org** as a valid host.
- Broadcast to your local network.
