import os
from PIL import Image

def main():
    img_path = 'logo.png'
    if not os.path.exists(img_path):
        print(f"Error: {img_path} not found.")
        return

    try:
        img = Image.open(img_path)
        print(f"Loaded {img_path} successfully. Size: {img.size}, Format: {img.format}")

        # 1. Save favicon.ico (containing 16x16, 32x32, 48x48 sizes)
        icon_sizes = [(16, 16), (32, 32), (48, 48)]
        img.save('favicon.ico', sizes=icon_sizes)
        print("Generated favicon.ico successfully.")

        # 2. Save favicon-32x32.png
        img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
        img_32.save('favicon-32x32.png')
        print("Generated favicon-32x32.png successfully.")

        # 3. Save favicon-48x48.png
        img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
        img_48.save('favicon-48x48.png')
        print("Generated favicon-48x48.png successfully.")

        # 4. Save favicon-96x96.png
        img_96 = img.resize((96, 96), Image.Resampling.LANCZOS)
        img_96.save('favicon-96x96.png')
        print("Generated favicon-96x96.png successfully.")

        # 5. Save android-chrome-192x192.png
        img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
        img_192.save('android-chrome-192x192.png')
        print("Generated android-chrome-192x192.png successfully.")

        # 6. Save apple-touch-icon.png
        img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
        img_180.save('apple-touch-icon.png')
        print("Generated apple-touch-icon.png successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == '__main__':
    main()
