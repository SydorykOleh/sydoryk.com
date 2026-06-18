import os
import glob
from pathlib import Path
from PIL import Image

def process_textures():
    # Input pattern to match all batch folders and collections
    input_pattern = r"G:\projects\01_FREELANCE\2026-04-FluxBe\01_scene\nuke\batch*\texture_webp\*_4k\*.webp"
    
    # Base output directory
    output_base = Path(r"G:\projects\01_FREELANCE\2026-04-FluxBe\01_scene\houdini\tex")
    
    # Find all matching files
    files = glob.glob(input_pattern)
    
    if not files:
        print("No files found matching the pattern.")
        return

    print(f"Found {len(files)} files to process.")
    
    for file_path in files:
        p = Path(file_path)
        
        # Extract <collection>_4k and <texture-type>.webp from the path
        # Example: G:\...\texture_webp\BE-03_4k\roughness.webp
        # p.parent.name -> "BE-03_4k"
        # p.stem -> "roughness"
        collection_dir = p.parent.name
        texture_type = p.stem
        
        # Construct output path
        output_dir = output_base / collection_dir
        output_file = output_dir / f"{texture_type}.jpeg"
        
        # Create output directory if it doesn't exist
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Convert and save
        try:
            with Image.open(p) as img:
                # Convert to RGB (JPEG does not support alpha channels)
                rgb_im = img.convert('RGB')
                rgb_im.save(output_file, 'JPEG', quality=90)
            print(f"Saved: {output_file}")
        except Exception as e:
            print(f"Failed to process {file_path}:\n{e}")

if __name__ == "__main__":
    print("Starting texture conversion...")
    process_textures()
    print("Done!")
