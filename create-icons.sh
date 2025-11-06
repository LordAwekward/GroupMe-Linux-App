#!/bin/bash

# This script creates a simple placeholder icon for the GroupMe app
# Replace this with your own icon for a better look

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it to generate icons:"
    echo "sudo apt-get install imagemagick"
    exit 1
fi

# Create assets directory if it doesn't exist
mkdir -p assets

# Create a simple blue icon with "GM" text (512x512 for best quality)
convert -size 512x512 xc:#00AFF0 \
    -gravity center \
    -pointsize 240 \
    -font "DejaVu-Sans-Bold" \
    -fill white \
    -annotate +0+0 "GM" \
    assets/icon.png

echo "Created assets/icon.png (512x512)"
echo "This icon will be used for window, taskbar, tray, desktop, and file manager."
echo "You can replace it with your own icon for a better look!"
