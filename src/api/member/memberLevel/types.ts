export interface MemberLevelVO {
  /**
   * 主键ID
   */
  id: string | number;

  /**
   * 等级称号
   */
  levelName: string;

  /**
   * 用户等级图标
   */
  url: string;

  /**
   * 用户等级数
   */
  level: number;

  /**
   * 进入金额
   */
  enterNum: number;

  /**
   * 日常充值金额
   */
  rechargeNumDay: number;

  /**
   * 日常邀请人数
   */
  investNumDay: number;

  /**
   * 升级要求充值总金额
   */
  upRechargeNum: number;

  /**
   * 升级邀请有效人数
   */
  upInvite: number;

  /**
   * 降级统计天数
   */
  downLevelDay: number;

  /**
   * 降级邀请人数
   */
  downLevelInvite: number;

  /**
   * 每日提现次数
   */
  withdrawNumDay: number;

  /**
   * 每日提现金额
   */
  withdrawMoneyDay: number;

  /**
   * 升级条件0:充值+邀请 1:充值升级 2:邀请升级 3：充值+等级
   */
  uptype: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 显示顺序
   */
  sort: number;

  /**
   * 是否启用 1、启用  2、停用
   */
  status: number;

  /**
   * 有效标识
   */
  mark: number;

  /**
   * 下一等级
   */
  nextLevel: string | number;

  /**
   * 服务费率
   */
  serviceFee: number;

  /**
   * 卖出印花税费率
   */
  sellingStampDutyFee: number;

  /**
   * 提现时间段（当地时间）
   */
  withdrawTimeRange: any;
}

export interface MemberLevelForm extends BaseEntity {
  /**
   * 主键ID
   */
  id?: string | number;

  /**
   * 等级称号
   */
  levelName?: string;

  /**
   * 用户等级图标
   */
  url?: string;

  /**
   * 用户等级数
   */
  level?: number;

  /**
   * 日常充值金额
   */
  rechargeNumDay?: number;

  /**
   * 日常邀请人数
   */
  investNumDay?: number;

  /**
   * 升级要求充值总金额
   */
  upRechargeNum?: number;

  /**
   * 升级邀请有效人数
   */
  upInvite?: number;

  /**
   * 升级所需下级vip等级数量
   */
  upByLowerLevelNum?: number;

  /**
   * 升级所需下级vip等级
   */
  upByLowerLeve?: number;

  /**
   * 每日提现次数
   */
  withdrawNumDay?: number;

  /**
   * 每日提现金额
   */
  withdrawMoneyDay?: number;

  /**
   * 提现最小金额
   */
  withdrawMinNum?: number;

  /**
   * 提现手续费
   */
  withdrawServiceFee?: number;

  /**
   * 升级条件0:充值+邀请 1:充值升级 2:邀请升级 3：充值+等级
   */
  uptype?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 显示顺序
   */
  sort?: number;

  /**
   * 是否启用 1、启用  2、停用
   */
  status?: number;

  /**
   * 有效标识
   */
  del?: number;

  /**
   * 下一等级
   */
  nextLevel?: string | number;

  /**
   * 服务费率
   */
  serviceFee?: number;

  /**
   * 卖出印花税费率
   */
  sellingStampDutyFee?: number;

  /**
   * 提现时间段（当地时间）
   */
  withdrawTimeRange?: string;
}

export interface MemberLevelQuery extends PageQuery {
  /**
   * 等级称号
   */
  levelName?: string;

  /**
   * 用户等级图标
   */
  url?: string;

  /**
   * 用户等级数
   */
  level?: number;

  /**
   * 日常充值金额
   */
  rechargeNumDay?: number;

  /**
   * 日常邀请人数
   */
  investNumDay?: number;

  /**
   * 升级要求充值总金额
   */
  upRechargeNum?: number;

  /**
   * 升级邀请有效人数
   */
  upInvite?: number;

  /**
   * 每日提现次数
   */
  withdrawNumDay?: number;

  /**
   * 每日提现金额
   */
  withdrawMoneyDay?: number;

  /**
   * 升级条件0:充值+邀请 1:充值升级 2:邀请升级 3：充值+等级
   */
  uptype?: number;

  /**
   * 显示顺序
   */
  sort?: number;

  /**
   * 是否启用 1、启用  2、停用
   */
  status?: number;

  /**
   * 有效标识
   */
  del?: number;

  /**
   * 下一等级
   */
  nextLevel?: string | number;

  /**
   * 服务费率
   */
  serviceFee?: number;

  /**
   * 卖出印花税费率
   */
  sellingStampDutyFee?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
