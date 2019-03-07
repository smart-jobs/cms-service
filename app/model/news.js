/**
 * 新闻信息
 */
'use strict';
const Schema = require('mongoose').Schema;
const metaPlugin = require('naf-framework-mongoose/lib/model/meta-plugin');

// 附件信息
const Attachment = new Schema({
  name: { type: String, maxLength: 128 },
  uri: { type: String, maxLength: 128 },
}, { _id: false });

// 新闻信息
const SchemaDefine = {
  column: { type: String, required: true, maxLength: 64 }, // 栏目
  title: { type: String, required: true, maxLength: 128 }, // 标题
  content: { type: String, required: true, maxLength: 102400, select: false }, // 内容详情
  picurl: { type: String, required: false, maxLength: 256 }, // 标题图片URL
  top: { type: Number, required: true, default: 0 }, // 置顶
  tags: [{ type: String, maxLength: 64 }], // 标签
  attachment: [ Attachment ], // 附件
  issuer: String, // 发文单位
  meta: {
    createdBy: String, // 创建用户
    updatedBy: String, // 修改用户
  },
  remark: { type: String, maxLength: 500 }, // 备注
};
const schema = new Schema(SchemaDefine, { 'multi-tenancy': true, toJSON: { virtuals: true } });
schema.plugin(metaPlugin);
schema.index({ column: 1 });
schema.index({ 'meta.state': 1 });
schema.index({ 'meta.createdAt': -1 });
schema.index({ 'meta.createdAt': -1, top: -1, 'meta.state': 1 });
module.exports = app => {
  const { mongoose } = app;
  return mongoose.model('NewsInfo', schema, 'cms_news');
};
