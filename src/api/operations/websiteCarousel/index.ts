import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebsiteCarouselVO, WebsiteCarouselForm, WebsiteCarouselQuery } from '@/api/operations/websiteCarousel/types';

/**
 * 查询站点-轮播管理列表
 * @param query
 * @returns {*}
 */

export const listWebsiteCarousel = (query?: WebsiteCarouselQuery): AxiosPromise<WebsiteCarouselVO[]> => {
  return request({
    url: '/operations/websiteCarousel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点-轮播管理详细
 * @param id
 */
export const getWebsiteCarousel = (id: string | number): AxiosPromise<WebsiteCarouselVO> => {
  return request({
    url: '/operations/websiteCarousel/' + id,
    method: 'get'
  });
};

/**
 * 新增站点-轮播管理
 * @param data
 */
export const addWebsiteCarousel = (data: WebsiteCarouselForm) => {
  return request({
    url: '/operations/websiteCarousel',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点-轮播管理
 * @param data
 */
export const updateWebsiteCarousel = (data: WebsiteCarouselForm) => {
  return request({
    url: '/operations/websiteCarousel',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点-轮播管理
 * @param id
 */
export const delWebsiteCarousel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/websiteCarousel/' + id,
    method: 'delete'
  });
};
