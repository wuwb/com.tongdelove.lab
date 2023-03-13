export default () => ({
  port: parseInt(process.env.PORT ? process.env.PORT : '3000', 10),
  isDev: process.env.NODE_ENV === 'development',
  environment: process.env.NODE_ENV || 'development',
  static: {
    jsPath: './dist/client/js',
  },
  defaultAccount: 'admin',
  defaultPassword: '123456',
});
