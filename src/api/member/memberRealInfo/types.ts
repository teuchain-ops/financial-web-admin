export interface MemberRealInfoVO {
  /**
   * id
   */
  memberId: string | number;

  /**
   * 祖国
   */
  fromCountry: string;

  /**
   * 真实姓名
   */
  realName: string;

  /**
   * 证件类型
   */
  idType: string | number;

  /**
   * 证件号
   */
  idNumber: string | number;

  /**
   * 第一页
   */
  firstImg: string;

  /**
   * 第二页
   */
  secondImg: string;

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 更新时间
   */
  updateTime: string;

  /**
   * 审核状态，0-pending，1-pass,2-reject
   */
  auditStatus: string;

}

export interface MemberRealInfoForm extends BaseEntity {
  /**
   * id
   */
  memberId?: string | number;

  /**
   * 用户名称
   */
  memberName?: string;

  /**
   * 祖国
   */
  fromCountry?: string;

  /**
   * 真实姓名
   */
  realName?: string;

  /**
   * 证件类型
   */
  idType?: string | number;

  /**
   * 证件号
   */
  idNumber?: string | number;

  /**
   * 第一页
   */
  firstImg?: string;

  /**
   * 第二页
   */
  secondImg?: string;

  /**
   * 居住地址证明
   */
   addressImg?: string;

  /**
   * 审核状态，0-pending，1-pass,2-reject
   */
  auditStatus?: number;

  /**
   * 审核意见
   */
  auditMsg?: string;

}

export interface MemberRealInfoQuery extends PageQuery {
  /**
   * id
   */
  memberId?: string | number;

  /**
   * 祖国
   */
  fromCountry?: string;

  /**
   * 真实姓名
   */
  realName?: string;

  /**
   * 证件类型
   */
  idType?: string | number;

  /**
   * 证件号
   */
  idNumber?: string | number;

  /**
   * 第一页
   */
  firstImg?: string;

  /**
   * 第二页
   */
  secondImg?: string;

  /**
   * 审核状态，0-pending，1-pass,2-reject
   */
  auditStatus?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



