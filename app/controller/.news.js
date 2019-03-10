module.exports = {
  // 起草新闻
  "create": {
    "parameters": {
      "query": ["!column"],
    },
    "requestBody": ["!title", "!content", "picurl", "top", "tags", "attachment", "issuer", "remark"],
  },
  // 修改新闻信息
  "update": {
    "parameters": {
      "query": ["!id"],
    },
    "requestBody": ["title", "content", "picurl", "top", "tags", "attachment", "issuer", "remark", "meta"],
    "options": {
      "projection": "+content",
    },
  },
  // 获取新闻详情
  "fetch": {
    "parameters": {
      "query": ["!id"],
    },
    "options": {
      "projection": "+content",
    },
  },
  // 删除新闻
  "delete": {
    "parameters": {
      "query": ["!id"],
    },
  },
  // 恢复新闻
  "restore": {
    "parameters": {
      "query": ["!id"],
    },
  },
  // 后台查询新闻列表
  "query": {
    "parameters": {
      "query": ["!column"],
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "attachment": 0
      }
    }
  },
  // 前台加载新闻列表
  "list": {
    "parameters": {
      "query": ["!column"],
      "options": {
        "meta.state": 0, // 只显示未删除数据
      },
    },
    "service": "query",
    "options": {
      "query": ["skip", "limit"],
      "sort": ["top", "meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "attachment": 0
      }
    }
  },
};
