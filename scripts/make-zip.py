import os
import zipfile
import shutil

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
EXCLUDE_DIRS = {'node_modules', 'dist', '.git', '.cache', '__pycache__', '.next', '.gradle', 'build'}
EXCLUDE_FILES = {
    '.DS_Store',
    'boss-ai-promotion.zip',
    'android-studio-project.zip',
    'local.properties',
    'server.cjs',
    'server.cjs.map'
}

# Clean any accidentally copied server files from android assets
android_assets_public = os.path.join(ROOT_DIR, 'android', 'app', 'src', 'main', 'assets', 'public')
if os.path.exists(android_assets_public):
    for bad_file in ['server.cjs', 'server.cjs.map', 'boss-ai-promotion.zip', 'android-studio-project.zip']:
        target = os.path.join(android_assets_public, bad_file)
        if os.path.exists(target):
            try:
                os.remove(target)
            except Exception:
                pass

public_dir = os.path.join(ROOT_DIR, 'public')
os.makedirs(public_dir, exist_ok=True)

# 1. Full project ZIP (includes android/, src/, server.ts, etc.)
zip_filename = os.path.join(ROOT_DIR, 'boss-ai-promotion.zip')
print(f"Zipping full project from {ROOT_DIR} into {zip_filename}...")
file_count = 0
with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(ROOT_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
        for file in files:
            if file in EXCLUDE_FILES or file.endswith('.zip') or file.endswith('.log'):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, ROOT_DIR)
            zf.write(full_path, rel_path)
            file_count += 1

public_zip = os.path.join(public_dir, 'boss-ai-promotion.zip')
shutil.copyfile(zip_filename, public_zip)
print(f"Full project ZIP: {file_count} files ({os.path.getsize(zip_filename) / (1024 * 1024):.2f} MB)")

# 2. Standalone Android Studio Project ZIP (contents of android/)
android_dir = os.path.join(ROOT_DIR, 'android')
android_zip_filename = os.path.join(ROOT_DIR, 'android-studio-project.zip')
if os.path.exists(android_dir):
    print(f"Zipping android folder from {android_dir} into {android_zip_filename}...")
    android_file_count = 0
    with zipfile.ZipFile(android_zip_filename, 'w', zipfile.ZIP_DEFLATED) as azf:
        for root, dirs, files in os.walk(android_dir):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS and not d.startswith('.')]
            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.zip') or file.endswith('.log'):
                    continue
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, android_dir)
                azf.write(full_path, rel_path)
                android_file_count += 1
    
    public_android_zip = os.path.join(public_dir, 'android-studio-project.zip')
    shutil.copyfile(android_zip_filename, public_android_zip)
    print(f"Android Studio ZIP: {android_file_count} files ({os.path.getsize(android_zip_filename) / (1024 * 1024):.2f} MB)")

