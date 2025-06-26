// Este arquivo será renomeado para babel.config.cjs para suportar Jest + ESModules
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ]
}; 