export interface StockNewVO {
  /**
   * 股票名称
   */
  stockName: string;

  /**
   * 股票代码
   */
  stockCode: string;

  /**
   * 交易所代码
   */
  exchangeCode: string;

  /**
   * 状态：0停用 1启用
   */
  status: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus: number;

  /**
   * 配售价格
   */
  price: number;

  /**
   * 手续费
   */
  serviceFee: number;

  /**
   * 最小申请数量
   */
  minApply: number;

  /**
   * 最大申请数量
   */
  maxApply: number;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

  /**
   * 认缴时间
   */
  payTime: string;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode: number;

  /**
   * 是否锁仓 0 不锁仓 1锁仓
   */
  lockStatus: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle: number;

  /**
   * 指定类型
   */
  assignType?: number;

  /**
   * 指定人群id
   */
  assignId?: any;

  /**
   * 最大申购次数
   */
  maxApplyTimes: number;

  /**
   * 是否强制购买列表
   */
  forceList: number;

  /**
   * 购买列表详情
   */
  listStr: string;
}

export interface StockNewForm extends BaseEntity {
  /**
   * 股票名称
   */
  stockName?: string;

  /**
   * 股票代码
   */
  stockCode?: string;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 公司介绍
   */
  introduce?: string;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 配售价格
   */
  price?: number;

  /**
   * 手续费
   */
  serviceFee?: number;

  /**
   * 最小申请数量
   */
  minApply?: number;

  /**
   * 最大申请数量
   */
  maxApply?: number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 认缴时间
   */
  payTime?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

  /**
   * 是否锁仓 0 不锁仓 1锁仓
   */
  lockStatus?: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle?: number;

  /**
   * 指定类型
   */
  assignType?: number;

  /**
   * 指定人群id
   */
  assignId?: any;

  /**
   * 最大申购次数
   */
  maxApplyTimes?: number;
  /**
   * 是否强制购买列表
   */
  forceList: number;

  /**
   * 购买列表详情
   */
  listStr: string;
}

export interface StockNewQuery extends PageQuery {

  /**
   * 股票名称
   */
  stockName?: string;

  /**
   * 股票代码
   */
  stockCode?: string;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 认缴时间
   */
  payTime?: string;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

  /**
   * 是否锁仓 0 不锁仓 1锁仓
   */
  lockStatus?: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle?: number;

  /**
   * 最大申购次数
   */
  maxApplyTimes?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}



