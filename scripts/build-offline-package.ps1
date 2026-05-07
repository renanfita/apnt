$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$staging = Join-Path $root ".release-staging\apnt2026-mapa-descarte-brasil-offline"
$downloadDir = Join-Path $root "downloads"
$zipPath = Join-Path $downloadDir "apnt2026-mapa-descarte-brasil-offline.zip"

if (Test-Path $staging) {
  Remove-Item -LiteralPath $staging -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $staging | Out-Null
New-Item -ItemType Directory -Force -Path $downloadDir | Out-Null

Copy-Item -LiteralPath (Join-Path $root "mapa_descarte_brasil.html") -Destination $staging
Copy-Item -LiteralPath (Join-Path $root "checklist.html") -Destination $staging
Copy-Item -LiteralPath (Join-Path $root "assets") -Destination $staging -Recurse
Copy-Item -LiteralPath (Join-Path $root "vendor") -Destination $staging -Recurse
Copy-Item -LiteralPath (Join-Path $root "docs\offline\LEIA-PRIMEIRO.txt") -Destination $staging
Copy-Item -LiteralPath (Join-Path $root "docs\offline\AVISO-OPERACIONAL.txt") -Destination $staging

$landingVideo = Join-Path $staging "assets\tutorial-apnt2026.mp4"
if (Test-Path $landingVideo) {
  Remove-Item -LiteralPath $landingVideo -Force
}

if (Test-Path $zipPath) {
  Remove-Item -LiteralPath $zipPath -Force
}

Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $zipPath -CompressionLevel Optimal
Write-Host "Pacote gerado em $zipPath"
