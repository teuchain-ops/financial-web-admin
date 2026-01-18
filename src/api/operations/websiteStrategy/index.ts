import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebsiteStrategyVO, WebsiteStrategyForm, WebsiteStrategyQuery } from '@/api/operations/websiteStrategy/types';

/**
 * 查询站点-股票策略列表
 * @param query
 * @returns {*}
 */

export const listWebsiteStrategy = (query?: WebsiteStrategyQuery): AxiosPromise<WebsiteStrategyVO[]> => {
  return request({
    url: '/operations/websiteStrategy/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点-股票策略详细
 * @param id
 */
export const getWebsiteStrategy = (id: string | number): AxiosPromise<WebsiteStrategyVO> => {
  return request({
    url: '/operations/websiteStrategy/' + id,
    method: 'get'
  });
};

/**
 * 新增站点-股票策略
 * @param data
 */
export const addWebsiteStrategy = (data: WebsiteStrategyForm) => {
  return request({
    url: '/operations/websiteStrategy',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点-股票策略
 * @param data
 */
export const updateWebsiteStrategy = (data: WebsiteStrategyForm) => {
  return request({
    url: '/operations/websiteStrategy',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点-股票策略
 * @param id
 */
export const delWebsiteStrategy = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/websiteStrategy/' + id,
    method: 'delete'
  });
};
