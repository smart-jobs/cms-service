'use strict';

const _ = require('lodash');
const meta = require('./.site.js');
const Controller = require('egg').Controller;
const { CrudController } = require('naf-framework-mongoose/lib/controller');
const { BusinessError, ErrorCode } = require('naf-core').Error;

class SiteController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.site;
  }

  // 获得当前分站信息
  async content() {
    // TODO: 检查用户信息
    const site = this.ctx.tenant;
    if (!_.isString(site)) throw new BusinessError(ErrorCode.BADPARAM, '租户信息不存在');

    const res = await this.service.fetch({ site }, {
      projection: { content: 1 }
    });
    this.ctx.ok({ data: res && res.content });
  }

  // 获得当前分站信息
  async config_fetch() {
    // TODO: 检查用户信息
    const site = this.ctx.tenant;
    if (!_.isString(site)) throw new BusinessError(ErrorCode.BADPARAM, '租户信息不存在');

    const res = await this.service.fetch({ site }, { projection: '+content' });
    this.ctx.ok({ data: res });
  }

  // 获得当前分站信息
  async config_get() {
    // TODO: 检查用户信息
    const site = this.ctx.tenant;
    if (!_.isString(site)) throw new BusinessError(ErrorCode.BADPARAM, '租户信息不存在');

    const res = await this.service.fetch({ site });
    this.ctx.ok({ data: res });
  }

  // 分站配置自身信息
  async config_set() {
    // TODO: 检查用户信息
    const userid = this.ctx.userid;
    if (!_.isString(userid)) throw new BusinessError(ErrorCode.NOT_LOGIN);
    const site = this.ctx.tenant;
    if (!_.isString(site)) throw new BusinessError(ErrorCode.BADPARAM, '租户信息不存在');

    const { name, domain, banner, copyright, theme, content, remark } = this.ctx.request.body;
    console.log('*********content**********\n', content);
    const res = await this.service.update({ site }, { name, domain, banner, copyright, theme, content, remark }, { projection: '+content' });
    this.ctx.ok({ data: res });
  }
}

module.exports = CrudController(SiteController, meta);
