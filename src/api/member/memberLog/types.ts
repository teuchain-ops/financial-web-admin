export interface MemberLogVO {
  /**
   * 唯一性标识
   */
  id: string | number;

  /**
   * 会员id
   */
  memberId: string | number;

  /**
   * 操作人用户名
   */
  username: string;

  /**
   * 日志标题
   */
  title: string;

  /**
   * 操作类型：1登录系统 2注销系统 3其他 4用户密码冻结
   */
  type: number;

  /**
   * IP地址
   */
  ip: string;

  /**
   * IP所属城市
   */
  ipCity: string;

  /**
   * 操作系统
   */
  os: string;

  /**
   * 浏览器
   */
  browser: string;

  /**
   * User-Agent
   */
  userAgent: string;

  /**
   * 有效标识：1正常 0删除
   */
  mark: number;

}

export interface MemberLogForm extends BaseEntity {
  /**
   * 唯一性标识
   */
  id?: string | number;

  /**
   * 会员id
   */
  memberId?: string | number;

  /**
   * 操作人用户名
   */
  username?: string;

  /**
   * 日志标题
   */
  title?: string;

  /**
   * 操作类型：1登录系统 2注销系统 3其他 4用户密码冻结
   */
  type?: number;

  /**
   * IP地址
   */
  ip?: string;

  /**
   * IP所属城市
   */
  ipCity?: string;

  /**
   * 操作系统
   */
  os?: string;

  /**
   * 浏览器
   */
  browser?: string;

  /**
   * User-Agent
   */
  userAgent?: string;

  /**
   * 有效标识：1正常 0删除
   */
  mark?: number;

}

export interface MemberLogQuery extends PageQuery {

  /**
   * 会员id
   */
  memberId?: string | number;

  /**
   * 操作人用户名
   */
  username?: string;

  /**
   * 日志标题
   */
  title?: string;

  /**
   * 操作类型：1登录系统 2注销系统 3其他 4用户密码冻结
   */
  type?: number;

  /**
   * IP地址
   */
  ip?: string;

  /**
   * IP所属城市
   */
  ipCity?: string;

  /**
   * 操作系统
   */
  os?: string;

  /**
   * 浏览器
   */
  browser?: string;

  /**
   * User-Agent
   */
  userAgent?: string;

  /**
   * 有效标识：1正常 0删除
   */
  mark?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



