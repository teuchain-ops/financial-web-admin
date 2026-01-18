export interface WebsiteCarouselVO {
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
  imgUrl: string;

  /**
   * 内容类型；1：文本；2：链接
   */
  contentType: number;

  /**
   * 状态；1：启用；0：停用
   */
  status: number;

  /**
   * 排序
   */
  sort: number;




}

export interface WebsiteCarouselForm extends BaseEntity {
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
  imgUrl?: string;

  /**
   * 内容类型；1：文本；2：链接
   */
  contentType?: number;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

  /**
   * 轮播内容
   */
  content?: string;

  /**
   * 链接地址
   */
  linkUrl?: string;

  /**
   * 打开方式 1-本页面 2-新页面 3-外部浏览器
   */
  openTarget?: number;

  /**
   * 排序
   */
  sort?: number;



}

export interface WebsiteCarouselQuery extends PageQuery {

  /**
   * 标题
   */
  title?: string;

  /**
   * 内容类型；1：文本；2：链接
   */
  contentType?: number;

  /**
   * 状态；1：启用；0：停用
   */
  status?: number;

    /**
     * 日期范围参数
     */
    params?: any;
}



