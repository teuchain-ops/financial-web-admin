import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberAmountLogVO, MemberAmountLogForm, MemberAmountLogQuery } from '@/api/member/memberAmountLog/types';

/**
 * 查询会员资金日志列表
 * @param query
 * @returns {*}
 */

export const listMemberAmountLog = (query?: MemberAmountLogQuery): AxiosPromise<MemberAmountLogVO[]> => {
  return request({
    url: '/member/memberAmountLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员资金日志详细
 * @param id
 */
export const getMemberAmountLog = (id: string | number): AxiosPromise<MemberAmountLogVO> => {
  return request({
    url: '/member/memberAmountLog/' + id,
    method: 'get'
  });
};

/**
 * 新增会员资金日志
 * @param data
 */
export const addMemberAmountLog = (data: MemberAmountLogForm) => {
  return request({
    url: '/member/memberAmountLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员资金日志
 * @param data
 */
export const updateMemberAmountLog = (data: MemberAmountLogForm) => {
  return request({
    url: '/member/memberAmountLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除会员资金日志
 * @param id
 */
export const delMemberAmountLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberAmountLog/' + id,
    method: 'delete'
  });
};
