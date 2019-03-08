'use strict';
const Schema = require('mongoose').Schema;
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 站点信息
const SchemaDefine = {
  site: { type: String, required: true, maxLength: 64, unique: true }, // 分站标识
  name: { type: String, required: true, maxLength: 64 }, // 站点名称
  status: { type: String, default: '0', maxLength: 64 }, // 站点状态：0-正常；1-未激活；2-注销
  domain: { type: String, required: true, maxLength: 128 }, // 域名
  banner: { type: String, required: false, maxLength: 256 }, // 网站Banner图片URL
  copyright: { type: String, required: false, maxLength: 256 }, // 版权声明
  theme: { type: String, default: 'default', maxLength: 64 }, // 样式主题
  content: { type: String, required: true, maxLength: 102400, select: false }, // 站点介绍/联系方式
  remark: { type: String, maxLength: 500 }, // 备注
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': false, toJSON: { virtuals: true } });
schema.plugin(metaPlugin);
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('SiteInfo', schema, 'cms_site');
};
