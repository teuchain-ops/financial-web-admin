import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebsiteCustomerVO, WebsiteCustomerForm, WebsiteCustomerQuery } from '@/api/operations/websiteCustomer/types';

/**
 * 查询站点-客服管理列表
 * @param query
 * @returns {*}
 */

export const listWebsiteCustomer = (query?: WebsiteCustomerQuery): AxiosPromise<WebsiteCustomerVO[]> => {
  return request({
    url: '/operations/websiteCustomer/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点-客服管理详细
 * @param id
 */
export const getWebsiteCustomer = (id: string | number): AxiosPromise<WebsiteCustomerVO> => {
  return request({
    url: '/operations/websiteCustomer/' + id,
    method: 'get'
  });
};

/**
 * 新增站点-客服管理
 * @param data
 */
export const addWebsiteCustomer = (data: WebsiteCustomerForm) => {
  return request({
    url: '/operations/websiteCustomer',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点-客服管理
 * @param data
 */
export const updateWebsiteCustomer = (data: WebsiteCustomerForm) => {
  return request({
    url: '/operations/websiteCustomer',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点-客服管理
 * @param id
 */
export const delWebsiteCustomer = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/websiteCustomer/' + id,
    method: 'delete'
  });
};

/**
 * 解绑代理线
 * @param data
 */
export const unbindProxy = (data: any) => {
  return request({
    url: '/operations/websiteCustomer/unbindProxy',
    method: 'put',
    data: data
  });
};
