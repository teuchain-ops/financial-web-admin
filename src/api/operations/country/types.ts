export interface CountryVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 国家名称
   */
  countryName: string;

  /**
   * 英文名称
   */
  showName: string;

  /**
   * 语言编码
   */
  languageCode: string;

  /**
   * 国家logo
   */
  countryLogo: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable: number;

}

export interface CountryForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 国家名称
   */
  countryName?: string;

  /**
   * 国家代码
   */
  countryCode?: string;

  /**
   * 英文名称
   */
  showName?: string;

  /**
   * 语言编码
   */
  languageCode?: string;

  /**
   * 国家logo
   */
  countryLogo?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
   * 是否白名单 1是 0否
   */
  isWhitelist?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface CountryQuery extends PageQuery {

  /**
   * 国家名称
   */
  countryName?: string;

  /**
   * 国家代码
   */
  countryCode?: string;

  /**
   * 英文名称
   */
  showName?: string;

  /**
   * 语言编码
   */
  languageCode?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}


