# Auto-Rebuild Guide

When running in production mode (`npm run start`), the site is **static** and won't update automatically when you add new MDX files.

## Quick Solutions:

### 1. **Manual Rebuild (Simple)**
After adding a new MDX post:
```bash
npm run restart
```

This will rebuild and restart your site.

### 2. **Development Mode (Auto-Reload)**
For writing/testing, use development mode:
```bash
npm run dev
```
- Auto-reloads when you add/edit MDX files
- Runs on http://localhost:3000 (or next available port)

### 3. **Auto-Rebuild Script (Advanced)**
For production with auto-rebuild:

First, install the file watcher:
```bash
sudo apt-get install inotify-tools
```

Then make the script executable and run it:
```bash
chmod +x watch-and-build.sh
./watch-and-build.sh
```

This will:
- Watch the `content/` folder
- Auto-rebuild when you add/edit MDX files
- Restart the production server
- Keep running on port 3010

## How It Works:

**Production Build (`npm run start`)**
- ✅ Fast and optimized
- ✅ Good for hosting/deployment
- ❌ Doesn't watch for changes
- Requires rebuild after content changes

**Development Mode (`npm run dev`)**
- ✅ Auto-reloads on changes
- ✅ Great for writing posts
- ❌ Slower than production
- Not for deployment

## Recommended Workflow:

1. **Writing posts**: Use `npm run dev`
2. **Testing production**: Use `npm run build && npm run start`
3. **After adding content**: Run `npm run restart`
4. **Continuous auto-rebuild**: Use `./watch-and-build.sh`

## PM2 Setup (Optional)

If you're using PM2 to manage your app, you can set up auto-rebuild:

```bash
# Install PM2 globally
npm install -g pm2

# Start with watch mode
pm2 start npm --name "mdx-blog" -- start --watch content/

# Save the process
pm2 save

# Auto-start on boot
pm2 startup
```

This will auto-restart your app when content changes.
