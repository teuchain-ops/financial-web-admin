export interface CommissionVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 佣金名称
   */
  name: string;

  /**
   * 返佣比例
   */
  ratio: number;

  /**
   * 返佣⽗级级数
   */
  level: number;

  /**
   * 返佣是否开启 1关闭 2开启
   */
  isRebate: number;

}

export interface CommissionForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 佣金名称
   */
  name?: string;

  /**
   * 返佣比例
   */
  ratio?: number;

  /**
   * 返佣⽗级级数
   */
  level?: number;

  /**
   * 返佣是否开启 1关闭 2开启
   */
  isRebate?: number;

}

export interface CommissionQuery extends PageQuery {

  /**
   * 佣金名称
   */
  name?: string;

  /**
   * 返佣比例
   */
  ratio?: number;

  /**
   * 返佣⽗级级数
   */
  level?: number;

  /**
   * 返佣是否开启 1关闭 2开启
   */
  isRebate?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



