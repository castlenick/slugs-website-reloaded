const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const webpack = require('webpack');

module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: require.resolve('url'),
        fs: require.resolve('fs'),
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
    };

    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    config.ignoreWarnings = [
        function ignoreSourcemapsloaderWarnings(warning) {
            return (
                warning.module &&
                warning.module.resource.includes('node_modules') &&
                warning.details &&
                warning.details.includes('source-map-loader')
            );
        },
    ];

    return config;
};
