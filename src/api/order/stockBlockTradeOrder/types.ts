export interface StockBlockTradeOrderVO {
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
   * 交易数量
   */
  num: number;

  /**
   * 每股价格
   */
  price: number;

  /**
   * 折扣价
   */
  discountPrice: number;

  /**
   * 总价
   */
  totalPrice: number;

  /**
   * 杠杆倍数
   */
  leverageMultiple: number;
}

export interface StockBlockTradeOrderForm extends BaseEntity {
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
   * 交易数量
   */
  num?: number;

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
   * 备注
   */
  remark?: string;

  /**
   * 杠杆倍数
   */
  leverageMultiple?: number;
}

export interface StockBlockTradeOrderQuery extends PageQuery {

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

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
     */
    params?: any;
}



