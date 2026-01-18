export interface WebsiteStrategyVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 类型 1-外汇 2-股票 3-指数
   */
  type: number;

  /**
   * 语言
   */
  language: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 关联产品id
   */
  relatedProductId: string | number;

  /**
   * 日内策略
   */
  intradayStrategy: string;

  /**
   * 图片地址
   */
  coverUrl: string;

  /**
   * 转折点
   */
  turningPoint: number;

  /**
   * 交易策略
   */
  tradingStrategy: string;

  /**
   * 备选策略
   */
  alternativeStrategy: string;

  /**
   * 技术意见
   */
  technicalOpinions: string;

  /**
   * 来源
   */
  source: string;

  /**
   * 状态 0-停用 1-启用
   */
  status: number;

  /**
   * 排序
   */
  sort: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识
   */
  del: number;
}

export interface WebsiteStrategyForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 类型 1-外汇 2-股票 3-指数
   */
  type?: number;

  /**
   * 语言
   */
  language?: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 关联产品id
   */
  relatedProductId?: string | number;

  /**
   * 日内策略
   */
  intradayStrategy?: string;

  /**
   * 图片地址
   */
  coverUrl?: string;

  /**
   * 转折点
   */
  turningPoint?: number;

  /**
   * 交易策略
   */
  tradingStrategy?: string;

  /**
   * 备选策略
   */
  alternativeStrategy?: string;

  /**
   * 技术意见
   */
  technicalOpinions?: string;

  /**
   * 来源
   */
  source?: string;

  /**
   * 状态 0-停用 1-启用
   */
  status?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识
   */
  del?: number;
}

export interface WebsiteStrategyQuery extends PageQuery {
  /**
   * 类型 1-外汇 2-股票 3-指数
   */
  type?: number;

  /**
   * 语言
   */
  language?: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 关联产品id
   */
  relatedProductId?: string | number;

  /**
   * 日内策略
   */
  intradayStrategy?: string;

  /**
   * 图片地址
   */
  coverUrl?: string;

  /**
   * 转折点
   */
  turningPoint?: number;

  /**
   * 交易策略
   */
  tradingStrategy?: string;

  /**
   * 备选策略
   */
  alternativeStrategy?: string;

  /**
   * 技术意见
   */
  technicalOpinions?: string;

  /**
   * 来源
   */
  source?: string;

  /**
   * 状态 0-停用 1-启用
   */
  status?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
