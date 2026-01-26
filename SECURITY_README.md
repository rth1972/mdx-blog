# Security Configuration

This application has been hardened with the following security measures:

## Directory Permissions

- **Code directories** (app, components, lib, etc.): `755` (read/execute only)
  - Prevents unauthorized modification of application code
  - Users cannot upload scripts to these directories

- **Upload directories** (public/uploads): `775` (writable)
  - Allows legitimate file uploads
  - Protected by .htaccess to prevent script execution

- **Environment files** (.env*): `600` (owner only)
  - Protects sensitive credentials
  - Not accessible by other users

## What This Prevents

✅ Users cannot upload PHP/shell scripts to code directories
✅ Users cannot modify existing application code
✅ Scripts in upload directories won't execute
✅ Environment variables are protected

## What Still Works

✅ Users can upload images to public/uploads
✅ Application runs normally
✅ PM2 can restart the application
✅ You can still modify code as the owner

## Maintenance

To update your code:
```bash
# You can still edit files normally as the owner
nano app/page.tsx

# After changes, PM2 will auto-restart
pm2 restart your-app-name
```

## Security Audit Log

Check the security audit log for details:
```bash
cat /home/robin/nextjs/security_audit_*.log
```

Last secured: $(date)
