export interface NotifyTemplateVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 国家ID
   */
  countryId: string | number;

  /**
   * 通知类型
   */
  notifyType: number;

  /**
   * 标题模板
   */
  title: string;

  /**
   * 内容模板
   */
  content: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable: number;

  /**
   * 备注
   */
  remark: string;

}

export interface NotifyTemplateForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 国家ID
   */
  countryId?: string | number;

  /**
   * 通知类型
   */
  notifyType?: number;

  /**
   * 标题模板
   */
  title?: string;

  /**
   * 内容模板
   */
  content?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface NotifyTemplateQuery extends PageQuery {

  /**
   * 国家ID
   */
  countryId?: string | number;

  /**
   * 通知类型
   */
  notifyType?: number;

  /**
   * 标题模板
   */
  title?: string;

  /**
   * 内容模板
   */
  content?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



