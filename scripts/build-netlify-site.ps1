$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$site = Join-Path $root ".release-staging\netlify-site"

if (Test-Path $site) {
  Remove-Item -LiteralPath $site -Recurse -Force
}

New-Item -ItemType Directory -Force -Path $site | Out-Null

$files = @(
  "index.html",
  "download.html",
  "privacidade.html",
  "checklist.html",
  "mapa_descarte_brasil.html",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml"
)

foreach ($file in $files) {
  Copy-Item -LiteralPath (Join-Path $root $file) -Destination $site
}

Copy-Item -LiteralPath (Join-Path $root "assets") -Destination $site -Recurse
Copy-Item -LiteralPath (Join-Path $root "vendor") -Destination $site -Recurse
Copy-Item -LiteralPath (Join-Path $root "downloads") -Destination $site -Recurse

Write-Host "Site publico preparado em $site"

