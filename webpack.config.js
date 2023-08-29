const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'client'),
      publicPath: '/',
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      // need to define rules for React: do it later
      {
        test: /\.jsx?/,
        exclude: '/node_modules/',
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              // { targets: 'defaults' },
            ],
          },
        },
      },
      {
        test: /\.tsx?$/, // this will apply to both .ts and .tsx files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript', // add this preset
              ],
            },
          },
          'ts-loader', // this will handle TypeScript compilation
        ],
      },
      // need to define rules for scss: do it later
      {
        test: /\.s[ac]ss$/i,
        exclude: '/node_modules/',
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
