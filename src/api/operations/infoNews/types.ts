export interface InfoNewsVO {
  /**
   * ID
   */
  id: string | number;

  /**
   * 标题
   */
  title: string;

  /**
   * 图片地址
   */
  coverUrl: string;

  /**
   * 资讯类型
   */
  articleType: number;

  /**
   * 语言
   */
  articleLanguage: string;

  /**
   * 状态；1：启用；0：停用
   */
  status: number;

   /**
   * 资讯来源
   */
   newsFrom: string;

  /**
   * 股票ID列表
   */
  stockIds?: string[];

}

export interface InfoNewsForm extends BaseEntity {
  /**
   * ID
   */
  id?: string | number;

  /**
   * 标题
   */
  title?: string;

  /**
   * 图片地址
   */
  coverUrl?: string;

  /**
   * 资讯类型
   */
  newsType?: number;

  /**
   * 语言
   */
  infoLanguage?: string;

  /**
   * 资讯时间
   */
  newsTime?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 文章内容
   */
  content?: string;

  /**
   * 备注
   */
  remark?: string;

   /**
   * 资讯来源
   */
   newsFrom: string;
  
  /**
   * 股票ID列表
   */
  stockIds?: string[];
}

export interface InfoNewsQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 资讯类型
   */
  newsType?: number;

  /**
   * 语言
   */
  infoLanguage?: string;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 日期范围参数
   */
  params?: any;
}