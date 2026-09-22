# AGENTS.md

## Cursor Cloud specific instructions

### Current repository state (read this first)

As of this writing, this repo (`isitme-uygulamam` — a planned mobile hearing app) is
**un-scaffolded**. The only tracked files are `README.md` and a stock Node.js
`.gitignore`. There is:

- no application code,
- no package manager manifest (`package.json`, `pnpm-lock.yaml`, `requirements.txt`, `pubspec.yaml`, etc.),
- no lockfiles, build config, or setup scripts,
- and therefore **nothing to install, build, run, lint, or test yet**.

If the above is still true when you start, there is no dev environment to set up and
no service to run. Do not fabricate one. The first real task is to scaffold the app.

### Update script

The startup update script is intentionally a guarded no-op today and only runs an
install once a Node project exists:

```
if [ -f package.json ]; then npm install; fi
```

If the project is scaffolded with a different stack (Flutter/Dart, React Native/Expo,
etc.) or a different package manager (pnpm/yarn), update the startup script and this
section accordingly. The environment already provides: Node `v22`, npm `10`,
pnpm `10`, yarn `1.22`, Python `3.12`.
