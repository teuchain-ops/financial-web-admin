export interface stockLeverageVO {
  /**
   * id
   */
  id: number;

  /**
   * 杠杆比率
   */
  leverageRatio: number;

  /**
   * 排序
   */
  sort: number;

  /**
   * 保证金要求
   */
  marginRequirement: number;

  /**
   * 启用状态：0停用 1启用
   */
  enable: number;

  /**
   * 备注
   */
  remark: string;

}

export interface stockLeverageForm extends BaseEntity {

  /**
   * id
   */
  id?: number;

  /**
   * 杠杆比率
   */
  leverageRatio?: number;

  /**
   * 排序
   */
  sort?: number;

  /**
   * 保证金要求
   */
  marginRequirement?: number;

  /**
   * 启用状态：0停用 1启用
   */
  enable?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface stockLeverageQuery extends PageQuery {

  /**
   * 启用状态：0停用 1启用
   */
  enable?: number;

}



