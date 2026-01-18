export interface StockFundVO {
  /**
   * 基金id
   */
  id: number;

  /**
   * 基金名称
   */
  name: string;

  /**
   * 基金图标
   */
  icon: string;

  /**
   * 基金体量
   */
  showAmount: number;

  /**
   * 最小投资额
   */
  minAmount: number;

  /**
   * 最大投资额
   */
  maxAmount: number;

  /**
   * 锁仓天数
   */
  lockCycle: number;

  /**
   * 状态 1开启 2关闭
   */
  status: number;

  /**
   * 最小利润率
   */
  minProfit: number;

   /**
   * 最大利润率
   */
  maxProfit: number;

  /**
   * 开始日期
   */
  startDate: string;

  /**
   * 开始时间
   */
  startTime: string;

   /**
   * 结束日期
   */
  endDate: string;
  /**
   * 结束时间
   */
  endTime: string;
}

export interface StockFundForm extends BaseEntity {
  /**
   * 基金id
   */
  id?: number;

  /**
   * 基金名
   */
  name?: string;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 基金体量
   */
  showAmount?: number;

  /**
   * 最小投资额
   */
  minAmount?: number;

  /**
   * 最大投资额
   */
  maxAmount?: number;

  /**
   * 锁仓周期
   */
  lockCycle?: number;

  /**
   * 状态 1 开启 2关闭
   */
  status?: number;

  /**
   * 最小总盈利额度
   */
  minProfit?: number;

  /**
   * 最大总盈利额度
   */
  maxProfit?: number;

  /**
   * 开始时间
   */
  startDate?: string;

  /**
   * 结束时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 认缴时间
   */
  endDate?: string;
}

export interface StockFundQuery extends PageQuery {

  /**
   * 股票名称
   */
  id?: number;

  /**
   * 基金名称
   */
  name?: string;

  /**
   * 状态 1开启 2关闭
   */
  status?: number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}

export interface StockFundOrderQuery extends PageQuery {

}

