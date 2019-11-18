let BACKEND_DOMAIN = 'http://localhost:8080';
if (process.env.NODE_ENV === 'production') {
  // 生产环境
  BACKEND_DOMAIN = 'http://xbossh5.limesoftware.cn';
} else if (process.env.NODE_ENV === 'development') {
  // 本地开发
  BACKEND_DOMAIN = 'http://localhost:8080';
}
export default {
  BACKEND_DOMAIN,
};
