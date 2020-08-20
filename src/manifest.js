
module.exports = {
  name: 'find-vant-api-vue',
  version: '1.0.0',
  description: '查询页面中使用的vant组件api文档',
  author: 'yura',
  manifest_version: 2,
  icons: { '16': 'icons/16.png', '128': 'icons/128.png' },
  permissions: [
    '<all_urls>',
    '*://*/*',
    'activeTab',
    'tabs',
    'cookies',
    'background',
    'contextMenus',
    'unlimitedStorage',
    'storage',
    'notifications',
    'identity',
    'identity.email',
    'extension'
  ],
  browser_action: {
    default_title: 'vant',
    default_popup: 'pages/popup.html'
  },
  background: {
    persistent: false,
    page: 'pages/background.html'
  },
  content_scripts: [{
    js: [ 'js/inject.js' ],
    run_at: 'document_start',
    matches: ['<all_urls>'],
    all_frames: true
  }],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: [ 'js/content.js' ]
}
