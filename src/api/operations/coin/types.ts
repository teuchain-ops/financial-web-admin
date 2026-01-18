export interface CoinVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 币种名称
   */
  coinName: string;

  /**
   * 币种代码
   */
  coinCode: string;

  /**
   * 币种符号
   */
  coinSymbol: string;

  /**
   * 买进汇率
   */
  buyRate: number;

  /**
   * 卖出汇率
   */
  sellRate: number;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable: number;

  /**
 * 是否默认币种 1：启用；0：停用
 */
  isDefaultCoin?: number;

}

export interface CoinForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 币种名称
   */
  coinName?: string;

  /**
   * 币种代码
   */
  coinCode?: string;

  /**
   * 币种符号
   */
  coinSymbol?: string;

  /**
   * 买进汇率
   */
  buyRate?: number;

  /**
   * 卖出汇率
   */
  sellRate?: number;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 是否默认币种 1：启用；0：停用
   */
  isDefaultCoin?: number;

  /**
   * icon地址
   */
  iconUrl?: string;

}

export interface CoinQuery extends PageQuery {

  /**
   * 币种名称
   */
  coinName?: string;

  /**
   * 币种代码
   */
  coinCode?: string;

  /**
   * 币种符号
   */
  coinSymbol?: string;

  /**
   * 买进汇率
   */
  buyRate?: number;

  /**
   * 卖出汇率
   */
  sellRate?: number;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
 * 是否默认币种 1：启用；0：停用
 */
  isDefaultCoin?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}



