export interface LogoVO {
  /**
   * id
   */
  id: string | number;

  /**
   * logo名称
   */
  coinName: string;

  /**
   * logo符合
   */
  coinCode: string;

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
   * 是否默认logo 1：启用；0：停用
   */
  isDefaultCoin?: number;

}

export interface LogoForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * logo名称
   */
  logoName?: string;

  /**
   * logo图片地址
   */
  logoUrl?: string;

  /**
   * 买进汇率
   */
  countryId?: number;

  /**
   * 启用状态 1：启用；0：停用
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;
}

export interface LogoQuery extends PageQuery {

  /**
   * logo名称
   */
  logoName?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  status?: number;
}



