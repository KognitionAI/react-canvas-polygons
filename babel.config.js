module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    ['minify', {
      builtIns: false  // Disable the problematic builtins transformation
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties'
  ]
};
