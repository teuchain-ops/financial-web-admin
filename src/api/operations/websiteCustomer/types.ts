export interface WebsiteCustomerVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 客服名称
   */
  name: string;

  /**
   * 客服图片
   */
  avatar: string;

  /**
   * 客服介绍
   */
  info: string;

  /**
   * 客服链接地址
   */
  linkUrl: string;

  /**
   * 工作开始时间
   */
  startTime: string;

  /**
   * 工作结束时间
   */
  endTime: string;

  /**
   * 状态；1：启用；0：停用
   */
  status: number;

  /**
   * 排序
   */
  sort: number;

  /**
   * 代理线用户Id
   */
  proxyMemberId: number;
}

export interface WebsiteCustomerForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 客服名称
   */
  name?: string;

  /**
   * 客服图片
   */
  avatar?: string;

  /**
   * 客服介绍
   */
  info?: string;

  /**
   * 客服链接地址
   */
  linkUrl?: string;

  /**
   * 工作开始时间
   */
  startTime?: string;

  /**
   * 工作结束时间
   */
  endTime?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 代理线用户Id
   */
  proxyMemberId?: number;
}

export interface WebsiteCustomerQuery extends PageQuery {

  /**
   * 客服名称
   */
  name?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



