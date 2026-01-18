export interface WebsiteNotifyVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 标题
   */
  title: string;

  /**
   * 语言
   */
  language: string;

  /**
   * 状态；1：启用；0：停用
   */
  status: number;

  /**
   * 展示类型；1：消息中心；2：弹窗
   */
  showType: number;



}

export interface WebsiteNotifyForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 标题
   */
  title?: string;

  /**
   * 语言
   */
  language?: string;

  /**
   * 消息内容
   */
  content?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 展示类型；1：消息中心；2：弹窗
   */
  showType?: number;



}

export interface WebsiteNotifyQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 语言
   */
  language?: string;

  /**
   * 展示类型；1：消息中心；2：弹窗
   */
  showType?: number;

  /**
     * 日期范围参数
     */
  params?: any;
}



