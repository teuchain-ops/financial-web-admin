export interface SmsLogVO {
  /**
   *
   */
  id: string | number;

  /**
   * 手机号
   */
  phone: string;

  /**
   * 内容
   */
  content: string;

  /**
   * 状态 0-未发送 1-发送成功 2-发送失败
   */
  status: number;
}

export interface SmsLogForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 手机号
   */
  phone?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 状态 0-未发送 1-发送成功 2-发送失败
   */
  status?: number;
}

export interface SmsLogQuery extends PageQuery {
  /**
   * 手机号
   */
  phone?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 状态 0-未发送 1-发送成功 2-发送失败
   */
  status?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
