import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebsiteMarqueeVO, WebsiteMarqueeForm, WebsiteMarqueeQuery } from '@/api/operations/websiteMarquee/types';

/**
 * 查询站点-跑马灯管理列表
 * @param query
 * @returns {*}
 */

export const listWebsiteMarquee = (query?: WebsiteMarqueeQuery): AxiosPromise<WebsiteMarqueeVO[]> => {
  return request({
    url: '/operations/websiteMarquee/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点-跑马灯管理详细
 * @param id
 */
export const getWebsiteMarquee = (id: string | number): AxiosPromise<WebsiteMarqueeVO> => {
  return request({
    url: '/operations/websiteMarquee/' + id,
    method: 'get'
  });
};

/**
 * 新增站点-跑马灯管理
 * @param data
 */
export const addWebsiteMarquee = (data: WebsiteMarqueeForm) => {
  return request({
    url: '/operations/websiteMarquee',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点-跑马灯管理
 * @param data
 */
export const updateWebsiteMarquee = (data: WebsiteMarqueeForm) => {
  return request({
    url: '/operations/websiteMarquee',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点-跑马灯管理
 * @param id
 */
export const delWebsiteMarquee = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/websiteMarquee/' + id,
    method: 'delete'
  });
};
