# Media Directory

This directory contains organized media assets for Nuxt Studio's media manager.

## Structure

- `articles/` - Images used in blog articles
- `portfolio/` - Images for portfolio projects
- `about/` - Images for about page and profile
- `gallery/` - General gallery images

## Usage with Nuxt Studio

When using Nuxt Studio's visual editor:
1. Image fields will show a media picker interface
2. You can upload new images directly through Studio
3. Existing images can be selected from the organized folders
4. Images are automatically optimized by Nuxt Image

## File Organization

- Keep image filenames descriptive
- Use appropriate folders for content type
- Images remain accessible at `/media/folder/filename.ext` URLs

## Note

Images in `/public/images/` remain functional and can still be used. This `/media/` structure provides better organization for Studio's interface.