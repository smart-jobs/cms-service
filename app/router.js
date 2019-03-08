'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // 网站数据接口
  router.get('/api/news/list', controller.news.list); // 新闻信息列表，隐藏删除信息，按照置顶和时间排序
  router.get('/api/news/fetch', controller.news.fetch); // 获取新闻详情
  router.get('/api/site/config', controller.site.config_get); // 获取站点基本信息
  router.get('/api/site/content', controller.site.content); // 获取站点详细信息（关于我们、联系方式）

  // 管理接口
  // 【分站】新闻接口
  router.get('/admin/news/query', controller.news.query);// 查询新闻信息
  router.get('/admin/news/fetch', controller.news.fetch);// 获得新闻详情
  router.post('/admin/news/create', controller.news.create);// 发布新闻信息
  router.post('/admin/news/update', controller.news.update);// 修改新闻信息
  router.post('/admin/news/delete', controller.news.delete);// 删除新闻信息
  // 分站配置接口，用于分站管理员配置本分站信息
  router.get('/admin/site/config', controller.site.config_fetch);// 分站获取自身配置
  router.post('/admin/site/config', controller.site.config_set);// 分站配置自身
  // 系统管理员管理接口
  router.get('/admin/site/query', controller.site.query);// 查询分站信息
  router.get('/admin/site/fetch', controller.site.fetch);// 获得分站详情
  router.post('/admin/site/create', controller.site.create);// 发布分站信息
  router.post('/admin/site/update', controller.site.update);// 修改分站信息
  router.post('/admin/site/delete', controller.site.delete);// 删除分站信息
};
