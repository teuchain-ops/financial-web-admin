export interface MemberAmountLogVO {
  /**
   * 唯一性标识
   */
  id: string | number;

  /**
   * 会员id
   */
  memberId: string | number;

  /**
   * 名称
   */
  name: string;

  /**
   * 日志类型 1充值 2提现
   */
  type: number;

  /**
   * 金额
   */
  amount: number;

  /**
   * 变化前金额
   */
  amountBefore: number;

  /**
   * 变化后金额
   */
  amountAfter: number;

  /**
   * 对应订单id
   */
  otherId: string | number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识
   */
  del: number;

  /**
   * 账户类型(0-真实账户,1-模拟账户)
   */
  accountType: string;

  /**
   * 插入时间（用于排序）
   */
  insertTime: string;
}

export interface MemberAmountLogForm extends BaseEntity {
  /**
   * 唯一性标识
   */
  id?: string | number;

  /**
   * 会员id
   */
  memberId?: string | number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 日志类型 1充值 2提现
   */
  type?: number;

  /**
   * 金额
   */
  amount?: number;

  /**
   * 变化前金额
   */
  amountBefore?: number;

  /**
   * 变化后金额
   */
  amountAfter?: number;

  /**
   * 对应订单id
   */
  otherId?: string | number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 账户类型(0-真实账户,1-模拟账户)
   */
  accountType?: string;

  /**
   * 插入时间（用于排序）
   */
  insertTime?: string;
}

export interface MemberAmountLogQuery extends PageQuery {
  /**
   * 会员id
   */
  memberId?: string | number;

  /**
   * 名称
   */
  name?: string;

  /**
   * 日志类型 1充值 2提现
   */
  type?: number;

  /**
   * 金额
   */
  amount?: number;

  /**
   * 变化前金额
   */
  amountBefore?: number;

  /**
   * 变化后金额
   */
  amountAfter?: number;

  /**
   * 对应订单id
   */
  otherId?: string | number;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 账户类型(0-真实账户,1-模拟账户)
   */
  accountType?: string;

  /**
   * 插入时间（用于排序）
   */
  insertTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}
