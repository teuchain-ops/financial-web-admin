export interface BankWithdrawVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 用户id
   */
  memberId: string | number;

  /**
   * 通道id
   */
  channelId: string | number;

  /**
   * 状态 1、待审核 2、审核通过 3、审核拒绝
   */
  status: number;

  /**
   * 锁定状态 0、未锁定 1、已锁定
   */
  lockStatus: number;

  /**
   * 出款银行名称
   */
  bankName: string;

  /**
   * 出款银行卡号
   */
  cardNo: string;

  /**
   * 出款账户名
   */
  accountName: string;

  /**
   * 出款币种名称
   */
  coinName: string;

  /**
   * 出款金额(未转换)
   */
  unconvertedNum: number;

  /**
   * 出款金额(已转换)
   */
  convertedNum: number;

  /**
   * 出金汇率
   */
  withdrawRate: number;

  /**
   * 手续费
   */
  fee: number;

  /**
   * 实际出款金额
   */
  actualNum: number;

  /**
   * 审核时间
   */
  auditTime: string;

  /**
   * 审核人
   */
  auditBy: string;

}

export interface BankWithdrawForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 通道id
   */
  channelId?: string | number;

  /**
   * 状态 1、待审核 2、审核通过 3、审核拒绝
   */
  status?: number;

  /**
   * 锁定状态 0、未锁定 1、已锁定
   */
  lockStatus?: number;

  /**
   * 出款银行名称
   */
  bankName?: string;

  /**
   * 出款银行卡号
   */
  cardNo?: string;

  /**
   * 出款币种名称
   */
  coinName?: string;

  /**
   * 出款账户名
   */
  accountName?: string;

  /**
   * 出款金额(未转换)
   */
  unconvertedNum?: number;

  /**
   * 出款金额(已转换)
   */
  convertedNum?: number;

  /**
   * 出金汇率
   */
  withdrawRate?: number;

  /**
   * 手续费
   */
  fee?: number;

  /**
   * 实际出款金额
   */
  actualNum?: number;

  /**
   * 审核备注
   */
  auditRemark?: string;

  /**
   * 备注
   */
  remark?: string;

}

export interface BankWithdrawQuery extends PageQuery {

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 通道id
   */
  channelId?: string | number;

  /**
   * 状态 1、待审核 2、审核通过 3、审核拒绝
   */
  status?: number;

  /**
   * 锁定状态 0、未锁定 1、已锁定
   */
  lockStatus?: number;

  /**
   * 出款银行名称
   */
  bankName?: string;

  /**
   * 出款银行卡号
   */
  cardNo?: string;

  /**
   * 出款账户名
   */
  accountName?: string;

  /**
   * 审核时间
   */
  auditTime?: string;

  /**
   * 创建时间
   */
  createTime?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



