export interface StockExchangeRestVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 交易所代码
   */
  exchangeCode: string;

  /**
   * 休息日
   */
  restDate: string;

  /**
   * 备注
   */
  remark: string;

}

export interface StockExchangeRestForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 休息日
   */
  restDate?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface StockExchangeRestQuery extends PageQuery {

  /**
   * 交易所代码
   */
  exchangeCode?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



