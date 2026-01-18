export interface BankChannelVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 通道名称
   */
  channelName: string;

  /**
   * 通道类型 1-官方 2-三方
   */
  channelType: number;

  /**
   * 银行名称
   */
  bankName: string;

  /**
   * 银行卡号
   */
  cardNo: string;

  /**
   * 账户名
   */
  accountName: string;

  /**
   * IFSC码
   */
  ifscCode: string;

  /**
   * 单笔最低限额
   */
  lowest: number;

  /**
   * 单笔最高限额
   */
  highest: number;

  /**
   * 快捷金额列表
   */
  paymentAmount: string;

  /**
   * 显示顺序
   */
  sort: number;

  /**
   * 是否启用 1、启用  2、停用
   */
  status: number;

  /**
   * 代理线用户id
   */
  proxyMemberId: number;

  /**
   * 秘钥
   */
  secretKey: string;
}

export interface BankChannelForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 通道名称
   */
  channelName?: string;

  /**
   * 通道类型 1-官方 2-三方
   */
  channelType?: number;

  /**
   * 银行名称
   */
  bankName?: string;

  /**
   * 银行卡号
   */
  cardNo?: string;

  /**
   * 账户名
   */
  accountName?: string;

  /**
   * IFSC码
   */
  ifscCode?: string;

  /**
   * 单笔最低限额
   */
  lowest?: number;

  /**
   * 单笔最高限额
   */
  highest?: number;

  /**
   * 快捷金额列表
   */
  paymentAmount?: string;

  /**
   * 显示顺序
   */
  sort?: number;

  /**
   * 是否启用 1、启用  2、停用
   */
  status?: number;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 收款人国家地区
   */
  recipientCountry?: string;

  /**
   * 公司注册号
   */
   companyRegistrationNumber?: string;

  /**
   * 预估时间(小时)
   */
  estimatedTime?: string;

  /**
   * 支持币种
   */
  supportedCurrenciesList?: Array<String>;

  /**
   * 代理线用户id
   */
  proxyMemberId?: number;

  /**
   * 秘钥
   */
  secretKey?: string;
}

export interface BankChannelQuery extends PageQuery {

  /**
   * 通道名称
   */
  channelName?: string;

  /**
   * 通道类型 1-官方 2-三方
   */
  channelType?: number;

  /**
   * 银行名称
   */
  bankName?: string;

  /**
   * 银行卡号
   */
  cardNo?: string;

  /**
   * 账户名
   */
  accountName?: string;

  /**
   * 显示顺序
   */
  sort?: number;

  /**
   * 是否启用 1、启用  2、停用
   */
  status?: number;

  /**
   * 代理线用户id
   */
  proxyMemberId?: number;

  /**
   * 秘钥
   */
  secretKey?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



