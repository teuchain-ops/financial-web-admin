export interface StockVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 股票/指数名称
   */
  stockName: string;

  /**
   * 股票/指数代码
   */
  stockCode: string;

  /**
   * 产品类型 1-股票 2-指数
   */
  productType: number;

  /**
   * 交易所代码
   */
  exchangeCode: string;

  /**
   * 状态：0 1启用
   */
  status: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus: number;

  /**
   * 上个交易日价格
   */
  lastTimePrice: number;

  /**
   * 开盘价
   */
  openPrice: number;

  /**
   * 收盘价
   */
  closePrice: number;

  /**
   * 最高价
   */
  highPrice: number;

  /**
   * 最低价
   */
  lowPrice: number;

  /**
   * 成交量
   */
  tradeVolume: number;

  /**
   * 最新价格
   */
  price: number;

  /**
   * 涨跌价
   */
  floatingPrice: number;

  /**
   * 涨跌幅
   */
  floatingRate: number;

  /**
   * 更新日期
   */
  updateDate: string;

  /**
   * 公司介绍
   */
  introduce: string;

  /**
   * 备注
   */
  remark: string;

  /**
   * 软删除标识
   */
  del: number;
  /**
   * 市值
   */
  marketCap: string;
  /**
   * 收益
   */
  revenue: string;
  /**
   * 市盈率
   */
  peRatio: string;
  /**
   * 每股利润
   */
  eps: string;
  /**
   * 一年变化
   */
  oneYearChange: string;
  /**
   * 流通股数
   */
  sharesOutstanding: string;
  /**
   * 涨跌幅控制开关：0关闭 1开启
   */
  upDownSwitch: number;
  /**
   * 涨跌金额
   */
  upDownAmount: number;

  /**
   * 涨跌生效时间
   */
  upDownTime: string;

}

export interface StockForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 股票/指数名称
   */
  stockName?: string;

  /**
   * 股票/指数代码
   */
  stockCode?: string;

  /**
   * 股票图标
   */
  icon? :string

  /**
   * 产品类型 1-股票 2-指数
   */
  productType: number;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 状态：0 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 上个交易日价格
   */
  lastTimePrice?: number;

  /**
   * 开盘价
   */
  openPrice?: number;

  /**
   * 收盘价
   */
  closePrice?: number;

  /**
   * 最高价
   */
  highPrice?: number;

  /**
   * 最低价
   */
  lowPrice?: number;

  /**
   * 成交量
   */
  tradeVolume?: number;

  /**
   * 最新价格
   */
  price?: number;

  /**
   * 涨跌价
   */
  floatingPrice?: number;

  /**
   * 涨跌幅
   */
  floatingRate?: number;

  /**
   * 更新日期
   */
  updateDate?: string;

  /**
   * 公司介绍
   */
  introduce?: string;

  /**
   * 备注
   */
  remark?: string;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 市值
   */
  marketCap?: string;

  /**
   * 收益
   */
  revenue?: string;

  /**
   * 市盈率
   */
  peRatio?: string;

  /**
   * 每股利润
   */
  eps?: string;

  /**
   * 一年变化
   */
  oneYearChange?: string;

  /**
   * 流通股数
   */
  sharesOutstanding?: string;

  /**
   * 涨跌幅控制开关：0关闭 1开启
   */
  upDownSwitch?: number;
  /**
   * 涨跌金额
   */
  upDownAmount?: number;

  /**
   * 涨跌生效时间
   */
  upDownTime?: string;

  /**
   * 单笔最小交易数量
   */
  minSingleTrade?: number;

  /**
   * 单笔最大交易数量
   */
  maxSingleTrade?: number;

  /**
   * 最大杠杆倍率
   */
  maxLeverageRatio?: number;

  /**
   * 最大持仓数量
   */
  maxTotalHold?: number;

}

export interface StockQuery extends PageQuery {

  /**
   * 股票/指数名称
   */
  stockName?: string;

  /**
   * 股票/指数代码
   */
  stockCode?: string;

  /**
   * 产品类型 1-股票 2-指数
   */
  productType: number;

  /**
   * 交易所代码
   */
  exchangeCode?: string;

  /**
   * 状态：0 1启用
   */
  status?: number;

  /**
   * 交易状态：0停止 1正常
   */
  tradeStatus?: number;

  /**
   * 上个交易日价格
   */
  lastTimePrice?: number;

  /**
   * 开盘价
   */
  openPrice?: number;

  /**
   * 收盘价
   */
  closePrice?: number;

  /**
   * 最高价
   */
  highPrice?: number;

  /**
   * 最低价
   */
  lowPrice?: number;

  /**
   * 成交量
   */
  tradeVolume?: number;

  /**
   * 最新价格
   */
  price?: number;

  /**
   * 涨跌价
   */
  floatingPrice?: number;

  /**
   * 涨跌幅
   */
  floatingRate?: number;

  /**
   * 更新日期
   */
  updateDate?: string;

  /**
   * 公司介绍
   */
  introduce?: string;

  /**
   * 软删除标识
   */
  del?: number;

  /**
   * 日期范围参数
   */
  params?: any;

  /**
   * 涨跌幅控制开关：0关闭 1开启
   */
  upDownSwitch?: number;
}



