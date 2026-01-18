export interface StockFundOrderVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 订单号
   */
  orderNo: string;

  /**
   * 基金id
   */
  fundId: string | number;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * 状态：1进行中 2已结束
   */
  status: number;

  /**
   * 购买基金价格
   */
  amount: number;

  /**
   * 基金名字
  */
  name: string;

  /**
   * 来源：锁仓天数
   */
  lockCycle: number;

  /**
   * 来源：已锁仓天数
   */
  cycle: number;


  /**
   * 总利润
   */
  profit: string | number;

  /**
   * 总利润百分比
   */
  profitPercent: string | number;

  /**
   * 日利润
   */
  dayProfit: string | number;

  /**
   * 日利润百分比
   */
  dayProfitPercent: string | number;

}


export interface StockFundOrderQuery extends PageQuery {
  /**
   * 基金名
   */
  name?: string;

  /**
   * 订单号
   */
  orderNo?: string;

  /**
   * 基金模版id
   */
  fundId?: number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 状态：1进行中 2已结束
   */
  status?: number;

  /**
   * 日期范围参数
   */
  params?: any;

  /**
   * 结束时间
   */
  endTime?: string;
}

export interface StockFundOrderForm extends BaseEntity {
  /**
   * 基金id
   */
  id?: number;

  /**
   * 流水号
  */
  orderNo?: string;

  /**
   * 用户id
   */
  memberId?: number;

  /**
   * 基金id
  */
  fundId?: number;

  /**
   * 订单金额
  */
  amount?: string;

  /**
   * 基金名
   */
  name?: string;

  /**
   * 图标
   */
  icon?: string;

  /**
   * 手续费
  */
  fee?: string;

  /**
   * 客户锁仓天数
  */
  cycle?: number;

  /**
   * 用户账号
  */
  memberName?: string;

  /**
   * 创建时间
  */
  createTime?: string;

  /**
   * 结束时间
  */
  finishTime?: string;

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
   * 锁仓天数
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

  /**
   * 备注
  */
  remark?: string;

  /**
   * 总利润
   */
  profit: string | number;

  /**
   * 总利润百分比
   */
  profitPercent: string | number;

  /**
   * 日利润
   */
  dayProfit: string | number;

  /**
   * 日利润百分比
   */
  dayProfitPercent: string | number;

}


