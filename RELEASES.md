# Release Management Guide

this guide explains how to create and manage releases for scLAB downloads

## creating a new release

### 1. prepare your build artifacts

before creating a release, build your application for each platform:
- macOS: `scLAB-v{VERSION}.dmg`
- Windows: `scLAB-v{VERSION}.msi` (when ready)
- Linux: `scLAB-v{VERSION}.deb` and `scLAB-v{VERSION}.AppImage` (when ready)

### 2. create and push a version tag

```bash
# create a new tag (e.g., v0.2.0)
git tag v0.2.0

# push the tag to GitHub
git push origin v0.2.0
```

### 3. automatic release creation

the GitHub Actions workflow will automatically:
- detect the new tag
- create a GitHub release with the tag version
- generate release notes from recent commits

**Make sure to push .github/workflows

### 4. upload build artifacts

after the release is created, upload your build artifacts:

**option 1: via GitHub web interface**
1. go to `https://github.com/rikaaaac/sclab-site/releases`
2. find your release and click "Edit"
3. drag and drop your build files (DMG, MSI, etc.)
4. click "Update release"

**option 2: via GitHub CLI**
```bash
# upload macOS DMG
gh release upload v0.2.0 scLAB-v0.2.0.dmg

# upload Windows MSI
gh release upload v0.2.0 scLAB-v0.2.0.msi

# upload multiple files at once
gh release upload v0.2.0 scLAB-v0.2.0.dmg scLAB-v0.2.0.msi
```

### 5. update download.html

update the version number and download links in `download.html`:

```html
<!-- update version badge -->
<p class="version-info">Current Version: <span class="version-badge">v0.2.0</span></p>

<!-- update download links -->
<a href="https://github.com/rikaaaac/sclab-site/releases/download/v0.2.0/scLAB-v0.2.0.dmg"
   class="btn btn-primary">
    Download for macOS
</a>
```

### 6. update release notes section

add the new version to the release notes section in `download.html`:

```html
<div class="version-entry">
    <h3>Version 0.2.0 <span class="version-date">February 2026</span></h3>
    <h4>New Features</h4>
    <ul>
        <li>feature 1</li>
        <li>feature 2</li>
    </ul>
</div>
```

## release checklist

- [ ] build artifacts for all platforms
- [ ] create and push version tag
- [ ] verify GitHub Actions workflow completed
- [ ] upload build artifacts to the release
- [ ] update version number in download.html
- [ ] update download links in download.html
- [ ] add release notes to download.html
- [ ] test download links to ensure they work
- [ ] commit and push website updates

## troubleshooting

### release not created automatically
- verify the tag follows the format `v*.*.*` (e.g., v0.2.0)
- check the Actions tab on GitHub for workflow errors
- ensure you have pushed the tag to GitHub (`git push origin v0.2.0`)

### cannot upload artifacts
- ensure the release has been created first
- if using gh CLI, make sure you're authenticated (`gh auth login`)
- verify file names match what's referenced in download.html

## example workflow

```bash
# 1. create a new version
git tag v0.2.0
git push origin v0.2.0

# 2. wait for GitHub Actions to create the release

# 3. upload your build artifacts
gh release upload v0.2.0 scLAB-v0.2.0.dmg

# 4. update download.html with new version and links

# 5. commit and push changes
git add download.html
git commit -m "update download links for v0.2.0"
git push origin main
```
