# VSSPEED.IO - One-Click Complete Setup
# PowerShell script for automated installation

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "VSSPEED.IO - Complete Automated Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check admin privileges
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script requires Administrator privileges" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit 1
}

$projectPath = "C:\Users\burri\OneDrive\Desktop\first_project_Jamie_hamza\amtuning-local"

# Function to check if command exists
function Test-Command {
    param($Command)
    try {
        if (Get-Command $Command -ErrorAction Stop) {
            return $true
        }
    } catch {
        return $false
    }
}

# 1. Install Chocolatey
Write-Host "[1/7] Checking Chocolatey..." -ForegroundColor Yellow
if (-not (Test-Command choco)) {
    Write-Host "Installing Chocolatey..." -ForegroundColor Green
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Host "Chocolatey installed!" -ForegroundColor Green
} else {
    Write-Host "Chocolatey already installed" -ForegroundColor Gray
}

# 2. Install Git
Write-Host "`n[2/7] Checking Git..." -ForegroundColor Yellow
if (-not (Test-Command git)) {
    Write-Host "Installing Git..." -ForegroundColor Green
    choco install git -y
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    Write-Host "Git installed!" -ForegroundColor Green
} else {
    Write-Host "Git already installed" -ForegroundColor Gray
    git --version
}

# 3. Install Node.js
Write-Host "`n[3/7] Checking Node.js..." -ForegroundColor Yellow
if (-not (Test-Command node)) {
    Write-Host "Installing Node.js..." -ForegroundColor Green
    choco install nodejs -y
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    Write-Host "Node.js installed!" -ForegroundColor Green
} else {
    Write-Host "Node.js already installed" -ForegroundColor Gray
    node --version
    npm --version
}

# 4. Install MySQL
Write-Host "`n[4/7] Checking MySQL..." -ForegroundColor Yellow
if (-not (Test-Command mysql)) {
    Write-Host "Installing MySQL 8.0..." -ForegroundColor Green
    Write-Host "NOTE: You'll need to set a root password during installation" -ForegroundColor Yellow
    
    choco install mysql -y
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "MySQL installed!" -ForegroundColor Green
        
        # Start MySQL service
        Start-Service MySQL80 -ErrorAction SilentlyContinue
        
        Write-Host "`nMySQL service started" -ForegroundColor Green
    } else {
        Write-Host "MySQL installation failed. Please install manually:" -ForegroundColor Red
        Write-Host "https://dev.mysql.com/downloads/installer/" -ForegroundColor Yellow
    }
} else {
    Write-Host "MySQL already installed" -ForegroundColor Gray
    mysql --version
}

# 5. Install npm packages
Write-Host "`n[5/7] Installing npm packages..." -ForegroundColor Yellow
Set-Location $projectPath

if (-not (Test-Path "node_modules")) {
    Write-Host "Running npm install (this may take a few minutes)..." -ForegroundColor Green
    npm install
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "npm packages installed!" -ForegroundColor Green
    } else {
        Write-Host "npm install failed" -ForegroundColor Red
    }
} else {
    Write-Host "npm packages already installed" -ForegroundColor Gray
}

# 6. Setup environment
Write-Host "`n[6/7] Configuring environment..." -ForegroundColor Yellow
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host ".env file created from template" -ForegroundColor Green
    Write-Host "IMPORTANT: Edit .env with your credentials!" -ForegroundColor Yellow
} else {
    Write-Host ".env file already exists" -ForegroundColor Gray
}

# 7. Setup database
Write-Host "`n[7/7] Database setup..." -ForegroundColor Yellow
if (Test-Command mysql) {
    $setupDb = Read-Host "Setup MySQL database now? (Y/N)"
    if ($setupDb -eq "Y" -or $setupDb -eq "y") {
        Write-Host "Running SETUP_DATABASE.bat..." -ForegroundColor Green
        Start-Process -FilePath "SETUP_DATABASE.bat" -Wait -NoNewWindow
    }
}

# Summary
Write-Host "`n==========================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Installed components:" -ForegroundColor White
Write-Host "  [" -NoNewline
if (Test-Command choco) { Write-Host "OK" -ForegroundColor Green -NoNewline } else { Write-Host "X" -ForegroundColor Red -NoNewline }
Write-Host "] Chocolatey"

Write-Host "  [" -NoNewline
if (Test-Command git) { Write-Host "OK" -ForegroundColor Green -NoNewline } else { Write-Host "X" -ForegroundColor Red -NoNewline }
Write-Host "] Git"

Write-Host "  [" -NoNewline
if (Test-Command node) { Write-Host "OK" -ForegroundColor Green -NoNewline } else { Write-Host "X" -ForegroundColor Red -NoNewline }
Write-Host "] Node.js"

Write-Host "  [" -NoNewline
if (Test-Command mysql) { Write-Host "OK" -ForegroundColor Green -NoNewline } else { Write-Host "X" -ForegroundColor Red -NoNewline }
Write-Host "] MySQL"

Write-Host "  [" -NoNewline
if (Test-Path "node_modules") { Write-Host "OK" -ForegroundColor Green -NoNewline } else { Write-Host "X" -ForegroundColor Red -NoNewline }
Write-Host "] npm packages"

Write-Host "  [" -NoNewline
if (Test-Path ".env") { Write-Host "OK" -ForegroundColor Green -NoNewline } else { Write-Host "X" -ForegroundColor Red -NoNewline }
Write-Host "] .env configuration"

Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "  1. Edit .env file with your MySQL password" -ForegroundColor Yellow
Write-Host "  2. Get Gmail app password for security alerts" -ForegroundColor Yellow
Write-Host "  3. Run: START_VSSPEED.bat" -ForegroundColor Green
Write-Host ""

pause
