export interface StockNewOrderVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 订单号
   */
  orderNo: string;

  /**
   * 股票id
   */
  stockId: string | number;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * 状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签
   */
  status: number;

  /**
   * 转股状态：0：否 1：是
   */
  transferStatus: number;

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
   * 总价
   */
  totalPrice: number;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 付款时间
   */
  payTime: string;

  /**
   * 转股时间
   */
  transferTime: string;

  /**
   * 来源：1-用户申请 2-后台创建
   */
  source: number;

  /**
   * 未支付金额
   */
  unpaid: string | number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode: number;
}

export interface StockNewOrderForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 订单号
   */
  orderNo?: string;

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签
   */
  status?: number;

  /**
   * 转股状态：0：否 1：是
   */
  transferStatus?: number;

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
   * 总价
   */
  totalPrice?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 来源：1-用户申请 2-后台创建
   */
  source?: number;

  /**
   * 未支付金额
   */
  unpaid?: string | number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;
}

export interface StockNewOrderQuery extends PageQuery {
  /**
   * 订单号
   */
  orderNo?: string;

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 状态：1-待中签 2-已中签 3-已付款 4-已取消 5-未中签 6-已转股 7-未认缴 8-预中签
   */
  status?: number;

  /**
   * 转股状态：0：否 1：是
   */
  transferStatus?: number;

  /**
   * 来源：1-用户申请 2-后台创建
   */
  source?: number;

  /**
   * 未支付金额
   */
  unpaid?: string | number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



