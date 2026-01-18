export interface MemberBankCardVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * 银行id
   */
  bankId: string | number;

  /**
   * 银行名称
   */
  bankName: string;

  /**
   * 银行卡号
   */
  cardNo: string;

  /**
   * 账户名
   */
  accountName: string;

  /**
   * 有效期
   */
  validityPeriod: string | number;

}

export interface MemberBankCardForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 银行id
   */
  bankId?: string | number;

  /**
   * 银行名称
   */
  bankName?: string;

  /**
   * 银行卡号
   */
  cardNo?: string;

  /**
   * 账户名
   */
  accountName?: string;

  /**
   * 有效期
   */
  validityPeriod?: string | number;

  /**
   * 备注
   */
  remark?: string;

}

export interface MemberBankCardQuery extends PageQuery {

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 银行id
   */
  bankId?: string | number;

  /**
   * 银行名称
   */
  bankName?: string;

  /**
   * 银行卡号
   */
  cardNo?: string;

  /**
   * 账户名
   */
  accountName?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



