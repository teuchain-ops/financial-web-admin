export interface StockBlockTradeVO {
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
   * 锁仓状态：0未锁仓 1锁仓
   */
  lockStatus: number;

  /**
   * 折扣
   */
  discount: number;

  /**
   * 最小购买数量
   */
  minBuy: number;

  /**
   *最大购买数量
   */
  maxBuy: number;

  /**
   * 秘钥开关：1-开启 0-关闭
   */
  secretKeySwitch: number;

  /**
   * 秘钥
   */
  secretKey: string;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 最大申购次数
   */
  maxApplyTimes: number;

  /**
   * 杠杆倍数
   */
  leverageMultiple: number;

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
}

export interface StockBlockTradeForm extends BaseEntity {
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
  icon?: string

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
   * 锁仓状态：0未锁仓 1锁仓
   */
  lockStatus?: number;

  /**
   * 折扣
   */
  discount?: number;

  /**
   * 最小购买数量
   */
  minBuy?: number;

  /**
   * 最大购买数量
   */
  maxBuy?: number;

  /**
   * 秘钥开关：1-开启 0-关闭
   */
  secretKeySwitch?: number;

  /**
   * 秘钥
   */
  secretKey?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 最大申购次数
   */
  maxApplyTimes?: number;

  /**
   * 杠杆倍数
   */
  leverageMultiple?: number;

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
}

export interface StockBlockTradeQuery extends PageQuery {

  /**
   * 股票名称
   */
  stockName?: string;

  /**
   * 股票代码
   */
  stockCode?: string;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 锁仓状态：0未锁仓 1锁仓
   */
  lockStatus?: number;

  /**
   * 秘钥开关：1-开启 0-关闭
   */
  secretKeySwitch?: number;

  /**
   * 秘钥
   */
  secretKey?: string;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 杠杆倍数
   */
  leverageMultiple?: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}



