module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  module: {
    rules: [{ test: /\.ts$/, use: 'ts-loader' }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
