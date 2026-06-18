$ErrorActionPreference = "Stop"

$projectRoot = "$PSScriptRoot\.."
$publicAssetsDir = "$projectRoot\public\assets\configurator"

# Houdini Source Directories
$houdiniGeoDir = "G:\projects\01_FREELANCE\2026-04-FluxBe\01_scene\houdini\geo\bake"
$houdiniBakeDir = "G:\projects\01_FREELANCE\2026-04-FluxBe\01_scene\houdini\render\light_bake\chair"

Write-Host "Updating Houdini Assets..." -ForegroundColor Cyan

# Update Geometry
Write-Host "Copying GLTF Geometry..."
Copy-Item -Path "$houdiniGeoDir\chair_bake.gltf" -Destination "$publicAssetsDir\models\chair_bake.gltf" -Force
Copy-Item -Path "$houdiniGeoDir\chair_bake_data.bin" -Destination "$publicAssetsDir\models\chair_bake_data.bin" -Force

# Update Textures
Write-Host "Converting and Copying Baked Textures..."
node "$projectRoot\scripts\convert-bakes.js"

Write-Host "Done!" -ForegroundColor Green
