export interface MemberSuggestionVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 会员ID
   */
  memberId: string | number;

  /**
   * 会员名称
   */
  memberName: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 建议
   */
  suggestion: string;

  /**
   * 软删除标识
   */
  del: number;

  /**
   * 是否处理
   */
  isDeal: number;
}

export interface MemberSuggestionForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 会员ID
   */
  memberId?: string | number;

  /**
   * 会员名称
   */
  memberName?: string;

  /**
   * 建议
   */
  suggestion?: string;

  /**
   * 建议
   */
  ossIdList?: Array<string>;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 是否处理
   */
  isDeal?: number;
}

export interface MemberSuggestionQuery extends PageQuery {
  /**
   * 会员ID
   */
  memberId?: string | number;

  /**
   * 会员名称
   */
  memberName?: string;

  /**
   * 建议
   */
  suggestion?: string;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 是否处理
   */
  isDeal?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
