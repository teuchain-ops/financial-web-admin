import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SmsLogVO, SmsLogForm, SmsLogQuery } from '@/api/member/smsLog/types';

/**
 * 查询短信记录列表
 * @param query
 * @returns {*}
 */
export const listSmsLog = (query?: SmsLogQuery): AxiosPromise<SmsLogVO[]> => {
  return request({
    url: '/member/memberSmsLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询短信记录详细
 * @param id
 */
export const getSmsLog = (id: string | number): AxiosPromise<SmsLogVO> => {
  return request({
    url: '/member/memberSmsLog/' + id,
    method: 'get'
  });
};

/**
 * 新增短信记录
 * @param data
 */
export const addSmsLog = (data: SmsLogForm) => {
  return request({
    url: '/member/memberSmsLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改短信记录
 * @param data
 */
export const updateSmsLog = (data: SmsLogForm) => {
  return request({
    url: '/member/memberSmsLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除短信记录
 * @param id
 */
export const delSmsLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberSmsLog/' + id,
    method: 'delete'
  });
};
