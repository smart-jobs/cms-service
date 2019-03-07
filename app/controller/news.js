'use strict';

const _ = require('lodash');
const meta = require('./.news.js');
const Controller = require('egg').Controller;
const { CrudController } = require('naf-framework-mongoose/lib/controller');

class NewsController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.service = this.ctx.service.news;
  }

}

module.exports = CrudController(NewsController, meta);
