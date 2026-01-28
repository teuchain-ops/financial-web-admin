export interface StockTreasuryTradeOrderVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 股票id
   */
  stockId: string | number;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * 用户名称
   */
  memberName?: string;

  /**
   * 上级用户
   */
  inviterName?: string;

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
   * 交易数量
   */
  num: number;

  /**
   * 实际数量
   */
  actualNum?: number;

  /**
   * 每股价格
   */
  price: number;

  /**
   * 折扣 %
   */
  discount?: number;

  /**
   * 折扣价
   */
  discountPrice: number;

  /**
   * 总价
   */
  totalPrice: number;

  /**
   * 手续费
   */
  fee?: number;

  /**
   * 杠杆倍数
   */
  leverageMultiple: number;

  /**
   * 订单状态
   */
  status?: number;

  /**
   * 成交时间
   */
  createTime?: string;

  /**
   * 账户类型
   */
  accountType?: number;
}

export interface StockTreasuryTradeOrderForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * ids (批量操作)
   */
  ids?: Array<string | number>;

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 用户名称
   */
  memberName?: string;

  /**
   * 股票名称
   */
  stockName?: string;

  /**
   * 交易数量
   */
  num?: number;

  /**
   * 实际交易数量
   */
  actualNum?: number;

  /**
   * 每股价格
   */
  price?: number;

  /**
   * 折扣价
   */
  discountPrice?: number;

  /**
   * 总价
   */
  totalPrice?: number;

  /**
   * 手续费
   */
  fee?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 杠杆倍数
   */
  leverageMultiple?: number;

  /**
   * 审核结果
   */
  auditResult?: number;

  /**
   * 审核备注
   */
  auditRemark?: string;

  /**
   * 中签比例
   */
  obtainRate?: number;
}

export interface StockTreasuryTradeOrderQuery extends PageQuery {
  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 用户名称
   */
  memberName?: string;

  /**
   * 上级用户
   */
  inviterName?: string;

  /**
   * 测试用户
   */
  isFaker?: number | string;

  /**
   * 股票代码
   */
  stockCode?: string;

  /**
   * 股票名称
   */
  stockName?: string;

  /**
   * 交易所
   */
  exchangeCode?: string;

  /**
   * 订单状态
   */
  status?: number;

  /**
   * 创建时间
   */
  createTime?: any;

  /**
   * 交易数量
   */
  num?: number;

  /**
   * 杠杆倍数
   */
  leverageMultiple?: number;
  /**
   * 日期范围参数
   * */
  params?: any;
}
