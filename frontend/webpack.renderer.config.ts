import type { Configuration } from 'webpack';
import type { Module } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});


export const rendererConfig: Configuration = {
  // CAMBIA ESTO: de 'electron-renderer' a 'web'
  target: 'web', 
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    fallback: {
        "path": false,
        "fs": false,
        "events": false, 
      },
  },
  node: {
    __dirname: false,
    __filename: false,
  },
};
