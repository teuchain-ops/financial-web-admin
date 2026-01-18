import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { EmailLogVO, EmailLogForm, EmailLogQuery } from '@/api/member/emailLog/types';

/**
 * 查询邮件记录列表
 * @param query
 * @returns {*}
 */
export const listEmailLog = (query?: EmailLogQuery): AxiosPromise<EmailLogVO[]> => {
  return request({
    url: '/member/memberEmailLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询邮件记录详细
 * @param id
 */
export const getEmailLog = (id: string | number): AxiosPromise<EmailLogVO> => {
  return request({
    url: '/member/memberEmailLog/' + id,
    method: 'get'
  });
};

/**
 * 新增邮件记录
 * @param data
 */
export const addEmailLog = (data: EmailLogForm) => {
  return request({
    url: '/member/memberEmailLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改邮件记录
 * @param data
 */
export const updateEmailLog = (data: EmailLogForm) => {
  return request({
    url: '/member/memberEmailLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除邮件记录
 * @param id
 */
export const delEmailLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberEmailLog/' + id,
    method: 'delete'
  });
};
