#!/bin/bash
# Subset fonts to Latin + common symbols for smaller file sizes
# Run once when fonts change, not on every build

set -e

FONTS_DIR="static/fonts"
SUBSET_DIR="static/fonts/subset"

# Unicode ranges:
# Basic Latin: U+0000-007F
# Latin-1 Supplement: U+0080-00FF  
# Latin Extended-A: U+0100-017F
# General Punctuation: U+2000-206F (includes —, ", ", ', ', …)
# Arrows: U+2190-21FF (includes →, ←)
# Mathematical Operators: U+2200-22FF (subset)
# Currency: U+20A0-20CF

UNICODES="U+0000-00FF,U+0100-017F,U+2000-206F,U+2190-21FF,U+20A0-20CF,U+2212,U+2260,U+2264,U+2265"

mkdir -p "$SUBSET_DIR"

echo "Subsetting fonts to Latin + common symbols..."
echo "Unicode ranges: $UNICODES"
echo ""

for font in "$FONTS_DIR"/*.woff2; do
    filename=$(basename "$font")
    name="${filename%.woff2}"
    
    echo "Processing $filename..."
    
    # Decompress woff2 to ttf
    woff2_decompress "$font" 2>/dev/null || {
        echo "  Skipping (woff2_decompress not available or failed)"
        continue
    }
    
    ttf_file="$FONTS_DIR/${name}.ttf"
    
    if [ -f "$ttf_file" ]; then
        # Subset the font
        pyftsubset "$ttf_file" \
            --unicodes="$UNICODES" \
            --layout-features='*' \
            --flavor=woff2 \
            --output-file="$SUBSET_DIR/${name}.woff2"
        
        # Clean up ttf
        rm "$ttf_file"
        
        # Report sizes
        original_size=$(stat -f%z "$font")
        subset_size=$(stat -f%z "$SUBSET_DIR/${name}.woff2")
        savings=$((100 - (subset_size * 100 / original_size)))
        
        echo "  $original_size → $subset_size bytes (${savings}% smaller)"
    fi
done

echo ""
echo "Done! Subset fonts are in $SUBSET_DIR"
echo "Update styles/fonts.css to use /fonts/subset/ paths"
