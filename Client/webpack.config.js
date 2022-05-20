const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file. DONE
// TODO: Add CSS loaders and babel to webpack. DONE

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        
      ],
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
          },
        ],
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env']
                }
              }
            }
          ],
          module: {
            rules: [
              { test: /\.css$/, use: 'css-loader' },
              { test: /\.ts$/, use: 'ts-loader' },
            ],
          },
          plugins: [
            // Other plugins...
            new InjectManifest({
              // These are some common options, and not all are required.
              // Consult the docs for more info.
              exclude: [/.../, '...'],
              swSrc: '...',
            }),
          ],
          plugins: [
            new WebpackPwaManifest({
              name: 'My Progressive Web App',
              short_name: 'MyPWA',
              description: 'My awesome Progressive Web App!',
              background_color: '#ffffff',
              crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
              icons: [
                {
                  src: path.resolve('src/assets/icon.png'),
                  sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
                },
                {
                  src: path.resolve('src/assets/large-icon.png'),
                  size: '1024x1024' // you can also use the specifications pattern
                },
                {
                  src: path.resolve('src/assets/maskable-icon.png'),
                  size: '1024x1024',
                  purpose: 'maskable'
                }
              ]
            })
          ],
          entry: 'index.js',
          output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index_bundle.js',
          },
          plugins: [new HtmlWebpackPlugin()],
        }
    },
  };
};
