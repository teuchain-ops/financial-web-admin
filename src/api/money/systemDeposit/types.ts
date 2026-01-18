export interface SystemDepositVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 入款单号
   */
  orderNo: string;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * 状态 2-审核通过
   */
  status: number;

  /**
   * 金额
   */
  actualNum: number;

  /**
   * 是否首次 0-否 1-是
   */
  firstFlag: number;

  /**
   * 账户类型 0-真实账户 1-模拟账户
   */
  accountType: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识 0-否 1-是
   */
  del: number;

}

export interface SystemDepositForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 入款单号
   */
  orderNo?: string;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 状态 2-审核通过
   */
  status?: number;

  /**
   * 金额
   */
  actualNum?: number;

  /**
   * 是否首次 0-否 1-是
   */
  firstFlag?: number;

  /**
   * 账户类型 0-真实账户 1-模拟账户
   */
  accountType?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识 0-否 1-是
   */
  del?: number;

}

export interface SystemDepositQuery extends PageQuery {

  /**
   * 入款单号
   */
  orderNo?: string;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 状态 2-审核通过
   */
  status?: number;

  /**
   * 金额
   */
  actualNum?: number;

  /**
   * 是否首次 0-否 1-是
   */
  firstFlag?: number;

  /**
   * 账户类型 0-真实账户 1-模拟账户
   */
  accountType?: string;

  /**
   * 软删除标识 0-否 1-是
   */
  del?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



