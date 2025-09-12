import cv2
import numpy as np
from PIL import Image

def gradient_darkening(img, strength=0.2):
    """
    Apply radial gradient darkening.
    strength = how dark edges become (0 → black, 1 → no effect).
    """
    h, w = img.shape
    y, x = np.ogrid[:h, :w]
    center_y, center_x = h / 2, w / 2
    distance = np.sqrt((x - center_x)**2 + (y - center_y)**2)
    max_dist = np.max(distance)

    # Radial mask from center → edges darkened
    mask = 1 - (1 - strength) * (distance / max_dist)
    mask = np.clip(mask, strength, 1.0)

    return (img * mask).astype(np.uint8)

def anonymize_single(image_path, output_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("❌ Error: Invalid path")
        return
    out = gradient_darkening(img, strength=0.2)
    Image.fromarray(out).save(output_path)
    print(f"✅ Saved gradient-darkened → {output_path}")

def anonymize_collage_side_by_side(ap_path, lat_path, output_path):
    ap = cv2.imread(ap_path, cv2.IMREAD_GRAYSCALE)
    lat = cv2.imread(lat_path, cv2.IMREAD_GRAYSCALE)
    if ap is None or lat is None:
        print("❌ Error: Invalid AP or Lateral path")
        return

    # Apply gradient darkening
    ap_dark = gradient_darkening(ap, strength=0.2)
    lat_dark = gradient_darkening(lat, strength=0.2)

    # Resize lateral to same height as AP for neat collage
    ap_h, ap_w = ap_dark.shape
    lat_h, lat_w = lat_dark.shape
    scale = ap_h / lat_h
    lat_resized = cv2.resize(lat_dark, (int(lat_w * scale), ap_h))

    # Concatenate side by side
    collage = np.hstack((ap_dark, lat_resized))

    # Save
    Image.fromarray(collage).save(output_path)
    print(f"✅ Saved side-by-side collage → {output_path}")


# Example usage
ap_path = "./P1340866..JPG"
lat_path = "./P1340866.JPG"
output_path = "oxford.png"

# Make collage
anonymize_collage_side_by_side(ap_path, lat_path, output_path)

