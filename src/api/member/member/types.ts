export interface MemberVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 代理ID
   */
  agentId: string | number;

  /**
   * 账号
   */
  username: string;

  /**
   * 登录密码
   */
  password: string;

  /**
   * 取款密码
   */
  passwordWithdraw: string;

  /**
   * 姓名
   */
  realName: string;

  /**
   * 性别（1男 2女 3未知）
   */
  gender: number;

  /**
   * 会员等级id
   */
  memberLevel: number;

  /**
   * 登录密码输错次数
   */
  passNum: number;

  /**
   * 邮箱
   */
  email: string;

  /**
   * 手机区号
   */
  phoneAreaCode: string;

  /**
   * 手机号
   */
  phone: string;

  /**
   * 注册时间
   */
  registerTime: string;

  /**
   * 注册域名
   */
  registerDomain: string;

  /**
   * 注册IP
   */
  registerIp: string;

  /**
   * 登录时间
   */
  loginTime: string;

  /**
   * 登录IP
   */
  loginIp: string;

  /**
   * 是否冻结 1：冻结；0：未冻结
   */
  isFreeze: number;

  /**
   * 冻结时间
   */
  freezeTime: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable: number;

  /**
   * 头像
   */
  avatar: string;

  /**
   * 推荐人Id
   */
  inviterId: string | number;

  /**
   * 推广码
   */
  inviteCode: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识
   */
  del: number;

  /**
   * 昵称
   */
  nickname: string;

  /**
   * 最近一次存款时间
   */
  lateDepositTime: string;

  /**
   * 设备类型：1，苹果 2，安卓 3，H5 4，PC站 5，后台添加
   */
  device: number;

  /**
   * 设备码
   */
  deviceCode: string;

  /**
   * 是否假人：0否 1是
   */
  isFaker: number;

  /**
   * IPO自动扣款：0-否 1-是
   */
  ipoAutomaticDeduct: number;

  /**
   * 禁止交易：0-否 1-是
   */
  prohibitTrade: number;

  /**
   * Post-IPO自动扣款：0-否 1-是
   */
  postIpoAutomaticDeduct: number;
}

export interface MemberForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 代理ID
   */
  agentId?: string | number;

  /**
   * 账号
   */
  username?: string;

  /**
   * 登录密码
   */
  password?: string;

  /**
   * 取款密码
   */
  passwordWithdraw?: string;

  /**
   * 姓名
   */
  realName?: string;

  /**
   * 性别（1男 2女 3未知）
   */
  gender?: number;

  /**
   * 会员等级id
   */
  memberLevel?: number;

  /**
   * 登录密码输错次数
   */
  passNum?: number;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 手机区号
   */
  phoneAreaCode?: string;

  /**
   * 手机号
   */
  phone?: string;

  /**
   * 注册时间
   */
  registerTime?: string;

  /**
   * 注册域名
   */
  registerDomain?: string;

  /**
   * 注册IP
   */
  registerIp?: string;

  /**
   * 登录时间
   */
  loginTime?: string;

  /**
   * 登录IP
   */
  loginIp?: string;

  /**
   * 是否冻结 1：冻结；0：未冻结
   */
  isFreeze?: number;

  /**
   * 冻结时间
   */
  freezeTime?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 推荐人Id
   */
  inviterId?: string | number;

  /**
   * 推广码
   */
  inviteCode?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 昵称
   */
  nickname?: string;

  /**
   * 最近一次存款时间
   */
  lateDepositTime?: string;

  /**
   * 设备类型：1，苹果 2，安卓 3，H5 4，PC站 5，后台添加
   */
  device?: number;

  /**
   * 设备码
   */
  deviceCode?: string;

  /**
   * 是否假人：0否 1是
   */
  isFaker?: number;

  /**
   * 账户类型：0真实账户 1模拟账户
   */
  accountType?: string;

  /**
   * IPO自动扣款：0-否 1-是
   */
  ipoAutomaticDeduct?: number;

  /**
   * 禁止交易：0-否 1-是
   */
  prohibitTrade?: number;

  /**
   * Post-IPO自动扣款：0-否 1-是
   */
  postIpoAutomaticDeduct?: number;
}

export interface MemberQuery extends PageQuery {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 代理ID
   */
  agentId?: string | number;

  /**
   * 账号
   */
  username?: string;

  /**
   * 登录密码
   */
  password?: string;

  /**
   * 取款密码
   */
  passwordWithdraw?: string;

  /**
   * 姓名
   */
  realName?: string;

  /**
   * 性别（1男 2女 3未知）
   */
  gender?: number;

  /**
   * 会员等级id
   */
  memberLevel?: number;

  /**
   * 登录密码输错次数
   */
  passNum?: number;

  /**
   * 邮箱
   */
  email?: string;

  /**
   * 手机区号
   */
  phoneAreaCode?: string;

  /**
   * 手机号
   */
  phone?: string;

  /**
   * 注册时间
   */
  registerTime?: string;

  /**
   * 注册域名
   */
  registerDomain?: string;

  /**
   * 注册IP
   */
  registerIp?: string;

  /**
   * 登录时间
   */
  loginTime?: string;

  /**
   * 登录IP
   */
  loginIp?: string;

  /**
   * 是否冻结 1：冻结；0：未冻结
   */
  isFreeze?: number;

  /**
   * 冻结时间
   */
  freezeTime?: string;

  /**
   * 启用状态 1：启用；0：停用
   */
  enable?: number;

  /**
   * 头像
   */
  avatar?: string;

  /**
   * 推荐人Id
   */
  inviterId?: string | number;

  /**
   * 推广码
   */
  inviteCode?: string;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 昵称
   */
  nickname?: string;

  /**
   * 最近一次存款时间
   */
  lateDepositTime?: string;

  /**
   * 设备类型：1，苹果 2，安卓 3，H5 4，PC站 5，后台添加
   */
  device?: number;

  /**
   * 设备码
   */
  deviceCode?: string;

  /**
   * 是否假人：0否 1是
   */
  isFaker?: number;

  ids?: any;

  /**
   * IPO自动扣款：0-否 1-是
   */
  ipoAutomaticDeduct?: number;

  /**
   * 禁止交易：0-否 1-是
   */
  prohibitTrade?: number;

  /**
   * Post-IPO自动扣款：0-否 1-是
   */
  postIpoAutomaticDeduct?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}

export interface SystemDepositQuery extends PageQuery {


  /**
   * 账号
   */
  memberName?: string;

  /**
   * 上级用户名
   */
  inviteMemberName?: string;

  /**
   * 注册时间
   */
  createTime?: string;

  /**
   * 日期范围参数
   */
  params?: any;
}


