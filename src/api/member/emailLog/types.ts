export interface EmailLogVO {
  /**
   *
   */
  id: string | number;

  /**
   * 电子邮箱
   */
  email: string;

  /**
   * 内容
   */
  content: string;

  /**
   * 状态 0-已验证 1-未验证
   */
  status: number;

  /**
   * 来源 0 注册
   */
  source: number;
}

export interface EmailLogForm extends BaseEntity {
  /**
   *
   */
  id?: string | number;

  /**
   * 电子邮箱
   */
  email?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 状态 0-已验证 1-未验证
   */
  status?: number;

  /**
   * 来源 0 注册
   */
  source?: number;
}

export interface EmailLogQuery extends PageQuery {
  /**
   * 电子邮箱
   */
  email?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 状态 0-已验证 1-未验证
   */
  status?: number;

  /**
   * 来源 0 注册
   */
  source?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
