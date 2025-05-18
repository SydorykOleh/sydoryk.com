# Root directory to search for videos
$RootDir = "videos_to_encode"
# Output directory for optimized videos
$OutputDir = "videos_encoded"

# Create output dir if it doesn't exist
if (-not (Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir | Out-Null
}

# Get all mp4 files recursively
$files = Get-ChildItem -Path $RootDir -Recurse -Include *.mp4

foreach ($file in $files) {
    # Compute relative path from RootDir
    $relativePath = $file.FullName.Substring((Get-Location).Path.Length).TrimStart('\','/')

    # Build output path (inside OutputDir, preserving folder structure)
    $outputPath = Join-Path $OutputDir $relativePath

    # Ensure output folder exists
    $outputFolder = Split-Path $outputPath
    if (-not (Test-Path $outputFolder)) {
        New-Item -ItemType Directory -Path $outputFolder | Out-Null
    }

    Write-Host "Processing $($file.FullName)..."

    # ffmpeg command arguments
    $arguments = @(
        '-i', "`"$($file.FullName)`"",
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', '23',
        '-movflags', '+faststart',
        '-c:a', 'aac',
        '-b:a', '128k',
        "`"$outputPath`""
    )

    # Run ffmpeg
    & ffmpeg.exe @arguments

    Write-Host "Saved optimized video to $outputPath"
}