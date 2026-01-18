export interface StockOrderVO {
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
   * 交易类型：1：买入 2：卖出
   */
  type: number;

  /**
   * 挂单状态：0：非挂单 1：挂单交易
   */
  pendingStatus: number;

  /**
   * 状态：1：交易中 2：交易成功 3：交易取消
   */
  status: number;

  /**
   * 成交价格（每股）
   */
  price: number;

  /**
   * 成交数量
   */
  num: number;

  /**
   * 手续费
   */
  fee: number;

  /**
   * 成交总价
   */
  totalPrice: number;

}

export interface StockOrderForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 交易类型：1：买入 2：卖出
   */
  type?: number;

  /**
   * 挂单状态：0：非挂单 1：挂单交易
   */
  pendingStatus?: number;

  /**
   * 状态：1：交易中 2：交易成功 3：交易取消
   */
  status?: number;

  /**
   * 成交价格（每股）
   */
  price?: number;

  /**
   * 成交数量
   */
  num?: number;

  /**
   * 手续费
   */
  fee?: number;

  /**
   * 成交总价
   */
  totalPrice?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface StockOrderQuery extends PageQuery {
  /**
   * 订单id
   */
  id?: string | number;

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 交易类型：1：买入 2：卖出
   */
  type?: number;

  /**
   * 挂单状态：0：非挂单 1：挂单交易
   */
  pendingStatus?: number;

  /**
   * 状态：1：交易中 2：交易成功 3：交易取消
   */
  status?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}



