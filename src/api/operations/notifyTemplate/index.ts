import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { NotifyTemplateVO, NotifyTemplateForm, NotifyTemplateQuery } from '@/api/operations/notifyTemplate/types';

/**
 * 查询国家对应通知模板列表
 * @param query
 * @returns {*}
 */

export const listNotifyTemplate = (query?: NotifyTemplateQuery): AxiosPromise<NotifyTemplateVO[]> => {
  return request({
    url: '/operations/notifyTemplate/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询国家对应通知模板详细
 * @param id
 */
export const getNotifyTemplate = (id: string | number): AxiosPromise<NotifyTemplateVO> => {
  return request({
    url: '/operations/notifyTemplate/' + id,
    method: 'get'
  });
};

/**
 * 新增国家对应通知模板
 * @param data
 */
export const addNotifyTemplate = (data: NotifyTemplateForm) => {
  return request({
    url: '/operations/notifyTemplate',
    method: 'post',
    data: data
  });
};

/**
 * 修改国家对应通知模板
 * @param data
 */
export const updateNotifyTemplate = (data: NotifyTemplateForm) => {
  return request({
    url: '/operations/notifyTemplate',
    method: 'put',
    data: data
  });
};

/**
 * 删除国家对应通知模板
 * @param id
 */
export const delNotifyTemplate = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/notifyTemplate/' + id,
    method: 'delete'
  });
};

/**
 * 查询国家
 */
export const getCountrySelection = () => {
  return request({
    url: '/selection/country',
    method: 'get'
  });
};

/**
 * 获取通知模板类型列表
 */
export const getNotifyTypeSelection = () => {
  return request({
    url: '/operations/notifyTemplate/getNotifyTypeSelection',
    method: 'get'
  });
};