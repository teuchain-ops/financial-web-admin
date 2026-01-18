export interface BankDepositVO {
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
   * 支付银行名称
   */
  bankName: string;

  /**
   * 支付银行卡号
   */
  cardNo: string;

  /**
   * 支付账户名
   */
  accountName: string;

  /**
   * 充值截图
   */
  imgUrl: string;

  /**
   * 入金汇率
   */
  depositRate: number;

  /**
   * 入款币种
   */
  coinName: string;

  /**
   * 支付金额
   */
  num: number;

  /**
   * 实际到款金额
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

  /**
   * 创建时间
   */
  createTime: string;

  /**
   * 是否首次：0：否 1：是
   */
  firstFlag: string | number;

}

export interface BankDepositForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 入款单号
   */
  orderNo?: string | number;

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
   * 支付银行名称
   */
  bankName?: string;

  /**
   * 支付银行卡号
   */
  cardNo?: string;

  /**
   * 支付账户名
   */
  accountName?: string;

  /**
   * 充值截图
   */
  imgUrl?: string;

  /**
   * 入款币种
   */
  coinName?: string;

  /**
   * 入金汇率
   */
  depositRate?: number;

  /**
   * 支付金额
   */
  num?: number;

  /**
   * 实际到款金额
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

  /**
   * 是否首次：0：否 1：是
   */
  firstFlag?: string | number;

}

export interface BankDepositQuery extends PageQuery {

  /**
   * 用户id
   */
  memberId?: string | number;

  /**
   * 入款单号
   */
  orderNo?: string;

  /**
   * 用户名
   */
  memberName?: string;

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
   * 支付银行名称
   */
  bankName?: string;

  /**
   * 支付银行卡号
   */
  cardNo?: string;

  /**
   * 支付账户名
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

  /**
   * 是否首次：0：否 1：是
   */
  firstFlag?: string | number;

}



