// vite.config.js
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [glsl({
    include: [                      // Glob pattern, or array of glob patterns to import
      '**/*.glsl', '**/*.wgsl',
      '**/*.vert', '**/*.frag',
      '**/*.vs', '**/*.fs'
    ],
    exclude: undefined,             // Glob pattern, or array of glob patterns to ignore
    warnDuplicatedImports: true,    // Warn if the same chunk was imported multiple times
    removeDuplicatedImports: false, // Automatically remove an already imported chunk
    defaultExtension: 'glsl',       // Shader suffix when no extension is specified
    minify: false,                  // Minify/optimize output shader code
    watch: true,                    // Recompile shader on change
    root: '/public/fragment'                    // Directory for root imports
  })]
});