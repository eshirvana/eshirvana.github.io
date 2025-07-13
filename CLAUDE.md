# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Hugo, a static site generator. The site showcases Ehsan Shirvanian's professional profile as a data engineer, traveler, and photographer.

## Architecture

- **Static Site Generator**: Hugo v0.148.1+extended
- **Theme**: hello-friend-ng (located in `themes/hello-friend-ng/`)
- **Configuration**: `config.toml` - main Hugo configuration file
- **Content**: Markdown files in `content/` directory
- **Static Assets**: Files in `static/` directory (favicons, CNAME, etc.)
- **Generated Output**: `public/` directory contains the built static site
- **Multi-language Support**: English (default) and French configured

## Common Development Commands

### Development Server
```bash
hugo server                    # Start development server on http://localhost:1313
hugo server -D                 # Include draft content
hugo server --bind 0.0.0.0     # Bind to all interfaces
```

### Building
```bash
hugo                           # Build the site to public/ directory
hugo --minify                  # Build with minification
hugo -D                        # Build including draft content
```

### Content Management
```bash
hugo new content/posts/my-post.md    # Create new content with archetype
hugo list drafts                     # List all draft content
```

### Deployment
The site is configured for GitHub Pages deployment with CNAME file pointing to `eshirvana.github.io`.

## Key Files and Directories

- `config.toml`: Hugo configuration, site metadata, menu structure, social links
- `content/about.md`: About page content with professional background
- `archetypes/default.md`: Template for new content creation
- `static/CNAME`: GitHub Pages custom domain configuration
- `public/`: Generated static site (not tracked in git)
- `resources/_gen/`: Hugo's generated resources cache

## Site Configuration Notes

- Base URL: `https://eshirvana.github.io`
- Theme toggle enabled
- Social links: LinkedIn, GitHub, Stack Overflow, Instagram, Email
- Custom logo text: `ehsan@home:~$`
- Multi-language setup with English as primary and French as secondary
- RSS feed limited to 10 items

## Content Structure

- Uses Hugo's front matter in YAML format
- About page includes professional skills and tools
- Configured for blog posts, tags, and series taxonomy
- Draft content support via front matter `draft: true`