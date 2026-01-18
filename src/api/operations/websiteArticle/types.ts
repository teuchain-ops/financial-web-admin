export interface WebsiteArticleVO {
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
   * 文章类型；1：帮助中心；2：新闻咨询
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
   * 排序
   */
  sort?: number;

}

export interface WebsiteArticleForm extends BaseEntity {
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
   * 文章类型；1：帮助中心；2：新闻咨询
   */
  articleType?: number;

  /**
   * 语言
   */
  articleLanguage?: string;

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
   * 排序
   */
  sort?: number;

}

export interface WebsiteArticleQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 文章类型；1：帮助中心；2：新闻咨询
   */
  articleType?: number;
  
  /**
   * 语言
   */
  articleLanguage?: string;  

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



