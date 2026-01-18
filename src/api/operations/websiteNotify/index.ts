import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebsiteNotifyVO, WebsiteNotifyForm, WebsiteNotifyQuery } from '@/api/operations/websiteNotify/types';
import { any } from "vue-types";

/**
 * 查询站点-系统消息列表
 * @param query
 * @returns {*}
 */

export const listWebsiteNotify = (query?: WebsiteNotifyQuery): AxiosPromise<WebsiteNotifyVO[]> => {
  return request({
    url: '/operations/websiteNotify/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点-系统消息详细
 * @param id
 */
export const getWebsiteNotify = (id: string | number): AxiosPromise<WebsiteNotifyVO> => {
  return request({
    url: '/operations/websiteNotify/' + id,
    method: 'get'
  });
};

/**
 * 新增站点-系统消息
 * @param data
 */
export const addWebsiteNotify = (data: WebsiteNotifyForm) => {
  return request({
    url: '/operations/websiteNotify',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点-系统消息
 * @param data
 */
export const updateWebsiteNotify = (data: WebsiteNotifyForm) => {
  return request({
    url: '/operations/websiteNotify',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点-系统消息
 * @param id
 */
export const delWebsiteNotify = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/websiteNotify/' + id,
    method: 'delete'
  });
};

/**
 * 消息推送
 * @param data
 */
export const pushWebsiteNotify = (data: any) => {
  return request({
    url: '/operations/websiteNotify/pushMessage',
    method: 'post',
    data: data
  });
};

export const pushWebsiteNotifyRecord = (query: any) => {
  return request({
    url: '/operations/websiteNotify/recordList',
    method: 'get',
    params: query
  });
};
