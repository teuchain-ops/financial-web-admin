export interface StockWarehouseVO {
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
   * 买入均价（每股）
   */
  buyAveragePrice: number;

  /**
   * 可用数量（可以交易）
   */
  availableNum: number;

  /**
   * 不可用数量
   */
  unavailableNum: number;

  /**
   * 创建时间
   */
  createTime: string;

}

export interface StockWarehouseForm extends BaseEntity {
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
   * 买入均价（每股）
   */
  buyAveragePrice?: number;

  /**
   * 可用数量（可以交易）
   */
  availableNum?: number;

  /**
   * 不可用数量
   */
  unavailableNum?: number;

}

export interface StockWarehouseQuery extends PageQuery {

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 买入均价（每股）
   */
  buyAveragePrice?: number;

  /**
   * 可用数量（可以交易）
   */
  availableNum?: number;

  /**
   * 不可用数量
   */
  unavailableNum?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



