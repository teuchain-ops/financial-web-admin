export interface MemberGroupVO {
  /**
   * 
   */
  id: string | number;

  /**
   * 分组名称
   */
  name: string;

  /**
   * 分组说明
   */
  remark: string;

  /**
   * 状态1正常 2禁用
   */
  status: number;

  /**
   * 用户数
   */
  memberCount: string;

  /**
   * 有效标识：1正常 0删除
   */
  mark: number;

}

export interface MemberGroupForm extends BaseEntity {
  /**
   * 
   */
  id?: string | number;

  /**
   * 分组名称
   */
  name?: string;

  /**
   * 分组说明
   */
  remark?: string;

  /**
   * 状态1正常 2禁用
   */
  status?: number;

  /**
   * 用户数
   */
  memberCount?: string;

  /**
   * 有效标识：1正常 0删除
   */
  mark?: number;

}

export interface MemberGroupQuery extends PageQuery {

  /**
   * 分组名称
   */
  name?: string;

  /**
   * 状态1正常 2禁用
   */
  status?: number;

  /**
   * 用户数
   */
  memberCount?: string;

  /**
   * 有效标识：1正常 0删除
   */
  mark?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



