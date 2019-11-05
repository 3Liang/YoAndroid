const domain = 'https://www.wanandroid.com/'

const loginUrl = domain + "user/login" //用户登录接口
const registerUrl = domain + "user/register" //用户注册接口
const homeBannerUrl = domain + "banner/json" //首页Banner接口
const topArticleUrl = domain + "article/top/json" //置顶文章接口
const normalArticleUrl = domain + "article/list/0/json" //普通文章接口
const structureTreeUrl = domain + "tree/json" //体系列表接口
const structureArticleListUrl = domain + "article/list/0/json?cid=*" //对应体系下文章列表接口
const publicListUrl = domain + "wxarticle/chapters/json" //公众号列表接口
const publicArticleListUrl = domain + "wxarticle/list/*/1/json" //公众号作者对应文章列表接口
const projectTypeListUrl = domain + "project/tree/json" //项目分类列表接口
const projectListUrl = domain + "project/list/1/json?cid=*" //获取对应分类下项目列表接口
const collectionListUrl = domain + "lg/collect/list/0/json" //获取用户收藏列表
const collectInsideArticleUrl = domain + "lg/collect/*/json" //收藏站内文章接口
const uncollectItemInUrl = domain + "lg/uncollect/*/json" //在收藏页面取消对应文章收藏
const uncollectItemOutUrl = domain + "lg/uncollect_originId/*/json" //在非收藏页面取消对应文章收藏
const personalPointsUrl = domain + "lg/coin/userinfo/json" //获取个人积分接口
const pointsRankUrl = domain + "coin/rank/1/json" //分页获取积分排行榜接口
const pointsListUrl = domain + "/lg/coin/list/1/json" //分页获取个人积分列表接口

module.exports = {
  loginUrl: loginUrl,
  registerUrl: registerUrl,
  homeBannerUrl: homeBannerUrl,
  topArticleUrl: topArticleUrl,
  normalArticleUrl: normalArticleUrl,
  structureTreeUrl: structureTreeUrl,
  structureArticleListUrl: structureArticleListUrl,
  publicListUrl: publicListUrl,
  publicArticleListUrl: publicArticleListUrl,
  projectTypeListUrl: projectTypeListUrl,
  projectListUrl: projectListUrl,
  collectionListUrl: collectionListUrl,
  collectInsideArticleUrl: collectInsideArticleUrl,
  uncollectItemInUrl: uncollectItemInUrl,
  uncollectItemOutUrl: uncollectItemOutUrl,
  personalPointsUrl: personalPointsUrl,
  pointsRankUrl: pointsRankUrl,
  pointsListUrl: pointsListUrl,
}