export interface StockExchangeVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 交易所名称
   */
  exchangeName: string;

  /**
   * 交易所代码
   */
  exchangeCode: string;

  /**
   * 交易所图标
   */
  exchangeLogo: string;

  /**
   * 交易所图标
   */
  exchangeLogoUrl: string;

  /**
   * 状态：0停用 1启用
   */
  status: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus: number;

  /**
   * 交易日
   */
  tradeDay: string;

  /**
   * 交易时间（当地时间）
   */
  tradeTime: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识
   */
  del: number;

}

export interface StockExchangeForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 交易所名称
   */
  exchangeName?: string;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 交易所图标
   */
  exchangeLogo?: string;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 交易日
   */
  tradeDay?: string;

  /**
   * 交易时间（当地时间）
   */
  tradeTime?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识
   */
  del?: number;

}

export interface StockExchangeQuery extends PageQuery {

  /**
   * 交易所名称
   */
  exchangeName?: string;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 交易所图标
   */
  exchangeLogo?: string;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 交易日
   */
  tradeDay?: string;

  /**
   * 交易时间（当地时间）
   */
  tradeTime?: string;

  /**
   * 软删除标识
   */
  del?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



