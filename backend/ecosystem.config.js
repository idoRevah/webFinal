module.exports = {
    apps: [
      {
        name: 'news-app',
        script: './dist/server.js',
        instances: 'max', // Use all available CPU cores
        exec_mode: 'cluster', // Enable cluster mode
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 80,
        },
      },
    ],
  };
  