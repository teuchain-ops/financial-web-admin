export interface StockPostNewVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 股票id
   */
  stockId: string | number;

  /**
   * 价格
   */
  price: number;

  /**
   * 状态：0-停用 1-启用
   */
  status: number;

  /**
   * 交易状态：0-停止 1-正常
   */
  tradeStatus: number;

  /**
   * 锁仓状态：0-未锁仓 1-锁仓
   */
  lockStatus: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle: number;

  /**
   * 最小申请数量
   */
  minApply: number;

  /**
   * 最大申请数量
   */
  maxApply: number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode: number;

  /**
   * 最大申购次数
   */
  maxApplyTimes: number;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

  /**
   * 配股时间
   */
  allotmentTime: string;

  /**
   * 手续费
   */
  serviceFee: number;

  /**
   * 指定类型：1-所有人 2-代理团队
   */
  assignType: number;

  /**
   * 指定人群ID
   */
  assignId: string | number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识：0-否 1-是
   */
  del: number;
}

export interface StockPostNewForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 价格
   */
  price?: number;

  /**
   * 图标
   */
  icon?: string,

  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 状态：0-停用 1-启用
   */
  status?: number;

  /**
   * 交易状态：0-停止 1-正常
   */
  tradeStatus?: number;

  /**
   * 锁仓状态：0-未锁仓 1-锁仓
   */
  lockStatus?: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle?: number;

  /**
   * 最小申请数量
   */
  minApply?: number;

  /**
   * 最大申请数量
   */
  maxApply?: number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

  /**
   * 最大申购次数
   */
  maxApplyTimes?: number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 配股时间
   */
  allotmentTime?: string;

  /**
   * 手续费
   */
  serviceFee?: number;

  /**
   * 指定类型：1-所有人 2-代理团队
   */
  assignType?: number;

  /**
   * 指定人群ID
   */
  assignId?: string | number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识：0-否 1-是
   */
  del?: number;
}

export interface StockPostNewQuery extends PageQuery {
  /**
   * 股票id
   */
  stockId?: string | number;

  /**
   * 价格
   */
  price?: number;

  /**
   * 状态：0-停用 1-启用
   */
  status?: number;

  /**
   * 交易状态：0-停止 1-正常
   */
  tradeStatus?: number;

  /**
   * 锁仓状态：0-未锁仓 1-锁仓
   */
  lockStatus?: number;

  /**
   * 锁仓周期（天）
   */
  lockCycle?: number;

  /**
   * 最小申请数量
   */
  minApply?: number;

  /**
   * 最大申请数量
   */
  maxApply?: number;

  /**
   * 付费模式：1-预付费 2-后付费
   */
  paymentMode?: number;

  /**
   * 最大申购次数
   */
  maxApplyTimes?: number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;

  /**
   * 配股时间
   */
  allotmentTime?: string;

  /**
   * 手续费
   */
  serviceFee?: number;

  /**
   * 指定类型：1-所有人 2-代理团队
   */
  assignType?: number;

  /**
   * 指定人群ID
   */
  assignId?: string | number;

  /**
   * 软删除标识：0-否 1-是
   */
  del?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}
