import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberLogVO, MemberLogForm, MemberLogQuery } from '@/api/member/memberLog/types';

/**
 * 查询会员日志列表
 * @param query
 * @returns {*}
 */

export const listMemberLog = (query?: MemberLogQuery): AxiosPromise<MemberLogVO[]> => {
  return request({
    url: '/member/memberLog/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员日志详细
 * @param id
 */
export const getMemberLog = (id: string | number): AxiosPromise<MemberLogVO> => {
  return request({
    url: '/member/memberLog/' + id,
    method: 'get'
  });
};

/**
 * 新增会员日志
 * @param data
 */
export const addMemberLog = (data: MemberLogForm) => {
  return request({
    url: '/member/memberLog',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员日志
 * @param data
 */
export const updateMemberLog = (data: MemberLogForm) => {
  return request({
    url: '/member/memberLog',
    method: 'put',
    data: data
  });
};

/**
 * 删除会员日志
 * @param id
 */
export const delMemberLog = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberLog/' + id,
    method: 'delete'
  });
};
