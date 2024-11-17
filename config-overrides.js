
module.exports = {
    webpack: (config, env) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        timers: require.resolve('timers-browserify'),
      };
      return config;
    },
  };
  