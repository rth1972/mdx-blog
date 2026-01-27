#!/usr/bin/env bash

# 1. Setup paths and colors
cd "$(dirname "$0")/.."
source ./tools/theme || exit
OUT_FILE="public/blog.txt"
BLOG_DATA=".contentlayer/generated/Post/_index.json"

# 2. Check if data exists
if [ ! -f "$BLOG_DATA" ]; then
  echo "Error: Contentlayer data not found."
  exit 1
fi

# 3. Write the Header (Overwriting the file)
echo -e "${CLR_PRIMARY}--- LATEST BLOG POSTS ---${RST}" >"$OUT_FILE"
echo "" >>"$OUT_FILE"

# 4. Process and Append Posts (Newest 4)
# - Sort by date
# - Reverse (Newest on top)
# - Take 4
jq -r 'sort_by(.date) | reverse | .[0:4] | .[] | "\(.date)|\(.title)|\(.slug)"' "$BLOG_DATA" | while IFS='|' read -r DATE TITLE SLUG; do

  CLEAN_SLUG=$(echo "$SLUG" | tr -d '[:space:]')
  CLEAN_DATE=$(echo "$DATE" | cut -d'T' -f1)

  {
    echo -e "  ${CLR_WARN}${CLEAN_DATE}${RST} - ${CLR_TEXT}${TITLE}${RST}"
    printf "  curl blog.robintehofstee.com/%s\n" "$CLEAN_SLUG"
    echo ""
  } >>"$OUT_FILE"
done

# 5. Add "More Posts" Footer if necessary
TOTAL_POSTS=$(jq '. | length' "$BLOG_DATA")
if [ "$TOTAL_POSTS" -gt 4 ]; then
  REMAINING=$((TOTAL_POSTS - 4))
  echo -e "  ${CLR_SUBTLE}...and $REMAINING more posts at ${RST}${CLR_PRIMARY}blog.robintehofstee.com/${RST}" >>"$OUT_FILE"
  echo "" >>"$OUT_FILE"
fi

echo "Success: public/blog.txt updated."
