---
title: Testing MDC Components
description: A comprehensive guide demonstrating how to use custom MDC components in your Nuxt Content articles with visual examples and practical usage patterns.
date: 2024-10-31
excerpt: Learn how to enhance your content with custom MDC components including image grids, aspect ratio images, and flexible layout options for richer storytelling.
text1: Custom MDC components allow you to extend your markdown content beyond standard formatting, giving you precise control over visual presentation while maintaining the simplicity of markdown editing.
text2: These components integrate seamlessly with Nuxt Studio's visual editor, making it easy for content creators to add rich media without touching code.
text3: By combining prose components for automatic styling with custom MDC components for special layouts, you create a powerful and flexible content system.
image:
  src: /Gallery/img_65dcd5a723854.jpg
  alt: Modern workspace showcasing custom component integration
footerImage:
  src: /Gallery/crosscurrent.webp
  alt: Creative studio demonstrating component-based content design
tags:
  - Nuxt Content
  - MDC Components
  - Content Management
  - Web Development
category: Technical Guide
featured: false
draft: true
author:
  name: Soft Spoken Studios
readingTime: 8 min read
---

# Testing MDC Components

This article demonstrates how to use custom MDC components in your markdown files.

## Single Image (16:9 Aspect Ratio)

::image-16x9
---
src: /Gallery/img_65dcd5a723854.jpg
alt: A beautiful landscape photo
caption: This is a 16:9 aspect ratio image with a caption
---
::

## Square Image (1:1 Aspect Ratio)

::image-square
---
src: /Gallery/crosscurrent.webp
alt: Square format image
captionLeft: Left caption
captionRight: Right caption with more detail about the image
---
::

## Image Grid

::image-grid
---
items:
  - src: /Gallery/img_65dcd5a723854.jpg
    alt: First image
    title: Beautiful Landscape
    link: /portfolio/wellness-app-launch
  - src: /Gallery/crosscurrent.webp
    alt: Second image
    title: Creative Studio
    link: /portfolio/creative-agency-rebrand
  - src: /Gallery/img_65dcd5a723854.jpg
    alt: Third image
    title: Modern Design
  - src: /Gallery/crosscurrent.webp
    alt: Fourth image
    title: Brand Identity
---
::

## Regular Markdown Content

You can mix regular markdown content with your custom components seamlessly. The prose components (like this paragraph) are styled automatically, while custom MDC components give you more control over layout and functionality.
