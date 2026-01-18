export interface WebsiteMarqueeVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 内容
   */
  content: string;

  /**
   * 状态；1：启用；0：停用
   */
  status: number;

  /**
   * 排序
   */
  sort: number;

  /**
   * 开始时间
   */
  startTime: string;

  /**
   * 结束时间
   */
  endTime: string;

}

export interface WebsiteMarqueeForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 内容
   */
  content?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 开始时间
   */
  startTime?: string;

  /**
   * 结束时间
   */
  endTime?: string;



}

export interface WebsiteMarqueeQuery extends PageQuery {

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



