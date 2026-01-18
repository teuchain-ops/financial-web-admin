export interface BankVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 银行名称
   */
  bankName: string;

  /**
   * 银行编号
   */
  bankCode: string;

  /**
   * 国家id
   */
  countryId: string | number;

  /**
   * 状态：0停用 1启用
   */
  status: number;

}

export interface BankForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 银行名称
   */
  bankName?: string;

  /**
   * 银行编号
   */
  bankCode?: string;

  /**
   * 国家id
   */
  countryId?: string | number;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

}

export interface BankQuery extends PageQuery {

  /**
   * 银行名称
   */
  bankName?: string;

  /**
   * 银行编号
   */
  bankCode?: string;

  /**
   * 状态：0停用 1启用
   */
  status?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



