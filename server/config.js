
/*开发版*/

const CONF = {
  port: '5757',
  rootPathname: '',
  // 微信小程序 App ID
  appId: 'wx174cc4736a89dd6e',
  // 微信小程序 App Secret
  appSecret: '17656065c44e31cca88bcfc66ac9b70d',
  // 是否使用腾讯云代理登录小程序
  useQcloudLogin: false,

  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: '118.89.61.217',
    port: 3306,
    user: 'lan',
    db: 'wx',
    pass: 'lan123',
    char: 'utf8mb4'
  },
  cos: {
    /**
     * 区域
     * @查看 https://cloud.tencent.com/document/product/436/6224
     */
    region: 'cn-north',
    // Bucket 名称
    fileBucket: 'wximg',
    // 文件夹
    uploadFolder: ''
  },
  // 微信登录态有效期
  wxLoginExpires: 7200
}
module.exports = process.env.NODE_ENV === 'local' ? Object.assign({}, CONF, require('./config.local')) : CONF;
