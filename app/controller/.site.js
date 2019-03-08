module.exports = {
  // 添加分站信息
  "create": {
    "parameters": {
      "requestBody": ["!name", "!site", "!domain", "banner", "!copyright", "theme", "!content", "remark"],
    },
  },
  // 修改分站信息
  "update": {
    "parameters": {
      "query": ["!site"],
    },
    "requestBody": ["name", "domain", "banner", "copyright", "theme", "content", "remark"],
    "options": {
      "projection": "+content",
    },
  },
  // 获取分站详情
  "fetch": {
    "parameters": {
      "query": ["!site"],
    },
    "options": {
      "projection": "+content",
    },
  },
  // 删除分站信息
  "delete": {
    "parameters": {
      "query": ["!site"],
    },
  },
  // 查询分站列表
  "query": {
    "parameters": {
      "query": ["status"],
    },
    "options": {
      "query": ["skip", "limit"],
      "sort": ["meta.createdAt"],
      "desc": true,
      "count": true,
      "projection": {
        "copyright": 0
      }
    }
  },
};
