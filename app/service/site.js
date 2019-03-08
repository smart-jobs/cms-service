'use strict';

const _ = require('lodash');
const { CrudService } = require('naf-framework-mongoose/lib/service');

class SiteService extends CrudService {
  constructor(ctx) {
    super(ctx);
    this.model = this.ctx.model.Site;
  }
}

module.exports = SiteService;
