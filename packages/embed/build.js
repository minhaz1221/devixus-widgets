const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

esbuild.build({
  entryPoints: ['src/loader.ts'],
  bundle: true,
  minify: true,
  outfile: 'dist/widget.js',
  format: 'iife',
  target: ['es2017'],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
}).then(() => {
  // Copy built file to apps/web/public/ so Next.js serves it
  const dest = path.join(__dirname, '../../apps/web/public/widget.js')
  fs.mkdirSync(path.dirname(dest), { recursive: true })
  fs.copyFileSync('dist/widget.js', dest)
  const size = fs.statSync(dest).size
  console.log(`✓ Built dist/widget.js`)
  console.log(`✓ Copied widget.js to apps/web/public/ (${size} bytes)`)
}).catch(() => process.exit(1))
