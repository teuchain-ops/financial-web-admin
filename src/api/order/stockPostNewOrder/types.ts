export interface StockPostNewOrderVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 订单号
   */
  orderNo: string;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * Post-IPO id
   */
  postNewId: string | number;

  /**
   * 来源：1-用户申请 2-后台创建
   */
  source: number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode: number;

  /**
   * 状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签
   */
  status: number;

  /**
   * 申请数量
   */
  applyNum: number;

  /**
   * 中签数量
   */
  obtainNum: number;

  /**
   * 每股价格
   */
  price: number;

  /**
   * 手续费
   */
  fee: number;

  /**
   * 总价
   */
  totalPrice: number;

  /**
   * 未支付金额
   */
  unpaid: string | number;

  /**
   * 审核时间
   */
  auditTime: string;

  /**
   * 中签时间
   */
  obtainTime: string;

  /**
   * 付款时间
   */
  payTime: string;

  /**
   * 取消时间
   */
  cancelTime: string;

  /**
   * 账户类型：0-真实账户 1-模拟账户
   */
  accountType: string;

  /**
   * 备注
   */
  remark: string;
}

export interface StockPostNewOrderForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 订单号
   */
  orderNo?: string;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * Post-IPO id
   */
  postNewId?: string | number;

  /**
   * 来源：1-用户申请 2-后台创建
   */
  source?: number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

  /**
   * 状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签
   */
  status?: number;

  /**
   * 申请数量
   */
  applyNum?: number;

  /**
   * 中签数量
   */
  obtainNum?: number;

  /**
   * 每股价格
   */
  price?: number;

  /**
   * 手续费
   */
  fee?: number;

  /**
   * 总价
   */
  totalPrice?: number;

  /**
   * 未支付金额
   */
  unpaid?: string | number;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 中签时间
   */
  obtainTime?: string;

  /**
   * 付款时间
   */
  payTime?: string;

  /**
   * 取消时间
   */
  cancelTime?: string;

  /**
   * 账户类型：0-真实账户 1-模拟账户
   */
  accountType?: string;

  /**
   * 备注
   */
  remark?: string;
}

export interface StockPostNewOrderQuery extends PageQuery {
  /**
   * 订单号
   */
  orderNo?: string;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * Post-IPO id
   */
  postNewId?: string | number;

  /**
   * 来源：1-用户申请 2-后台创建
   */
  source?: number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

  /**
   * 状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签
   */
  status?: number;

  /**
   * 申请数量
   */
  applyNum?: number;

  /**
   * 中签数量
   */
  obtainNum?: number;

  /**
   * 每股价格
   */
  price?: number;

  /**
   * 手续费
   */
  fee?: number;

  /**
   * 总价
   */
  totalPrice?: number;

  /**
   * 未支付金额
   */
  unpaid?: string | number;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 中签时间
   */
  obtainTime?: string;

  /**
   * 付款时间
   */
  payTime?: string;

  /**
   * 取消时间
   */
  cancelTime?: string;

  /**
   * 账户类型：0-真实账户 1-模拟账户
   */
  accountType?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
