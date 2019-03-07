'use strict';

const assert = require('assert');
const _ = require('lodash');
const { BusinessError, ErrorCode } = require('naf-core').Error;
const { isNullOrUndefined, trimData } = require('naf-core').Util;
const { CrudService } = require('naf-framework-mongoose/lib/service');

class NewsService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.News;
  }

  async create({ column }, { title, content, picurl, top, tags, attachment, issuer }) {
    // 检查数据
    assert(_.isString(column), 'column不能为空');
    assert(_.isString(title), 'title不能为空');
    assert(_.isString(content), 'content不能为空');
    assert(!picurl || _.isString(picurl), 'picurl必须为字符串');
    assert(_.isUndefined(top) || _.isNumber(top), 'top必须为数字');
    assert(!tags || _.isArray(tags), 'tags必须为数组');
    assert(!attachment || _.isArray(attachment), 'attachment必须为数组');
    assert(!issuer || _.isString(issuer), 'issuer必须为字符串');

    // TODO: 检查用户信息
    const userid = this.ctx.userid;
    if (!_.isString(userid)) throw new BusinessError(ErrorCode.NOT_LOGIN);

    // TODO:保存数据
    const data = {
      column, title, content, picurl, top, tags, attachment, issuer,
      meta: { createdBy: userid },
    };

    const res = await this.model.create(data);
    return res;
  }

  async update({ id }, payload) {
    // 检查数据
    const { title, content, picurl, top, tags, attachment, issuer } = payload;
    assert(id, 'id不能为空');
    assert(!title || _.isString(title), 'title必须为字符串');
    assert(!content || _.isString(content), 'content必须为字符串');
    assert(!picurl || _.isString(picurl), 'picurl必须为字符串');
    assert(_.isUndefined(top) || _.isNumber(top), 'top必须为数字');
    assert(!tags || _.isArray(tags), 'tags必须为数组');
    assert(!attachment || _.isArray(attachment), 'attachment必须为数组');
    assert(!issuer || _.isString(issuer), 'issuer必须为字符串');

    // TODO: 检查用户信息
    const userid = this.ctx.userid;
    if (!_.isString(userid)) throw new BusinessError(ErrorCode.NOT_LOGIN);

    // TODO:检查数据是否存在
    const doc = await this.model.findById(id).exec();
    if (isNullOrUndefined(doc)) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }

    // TODO:保存数据
    const data = trimData(payload);
    const res = await this.model.findByIdAndUpdate(doc.id, { ...data, 'meta.updatedBy': userid }, { new: true }).exec();

    return res;
  }

  async delete({ id }) {

    // TODO: 检查数据状态
    const doc = await this.model.findById(id).exec();
    if (!doc) {
      throw new BusinessError(ErrorCode.DATA_NOT_EXIST);
    }

    doc.meta.state = 1;
    await doc.save();
  }

  async fetch({ id }) {
    const doc = await this.model.findById(id, '+content').exec();
    return doc;
  }
}

module.exports = NewsService;
