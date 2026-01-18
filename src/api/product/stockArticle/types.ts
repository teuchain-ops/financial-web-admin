export interface StockArticleVO {
  /**
   * id
   */
  id: string | number;

  /**
   * 标题
   */
  title: string;

  /**
   * 内容
   */
  content: string;

  /**
   * 图文封面
   */
  coverUrl: string;

}

export interface StockArticleForm extends BaseEntity {
  /**
   * id
   */
  id?: string | number;

  /**
   * 标题
   */
  title?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 图文封面
   */
  coverUrl?: string;

}

export interface StockArticleQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 内容
   */
  content?: string;

  /**
   * 图文封面
   */
  coverUrl?: string;

    /**
     * 日期范围参数
     */
    params?: any;
}



