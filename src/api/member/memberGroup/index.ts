import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberGroupVO, MemberGroupForm, MemberGroupQuery } from '@/api/member/memberGroup/types';

/**
 * 查询用户分组列表
 * @param query
 * @returns {*}
 */

export const listMemberGroup = (query?: MemberGroupQuery): AxiosPromise<MemberGroupVO[]> => {
  return request({
    url: '/member/memberGroup/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用户分组详细
 * @param id
 */
export const getMemberGroup = (id: string | number): AxiosPromise<MemberGroupVO> => {
  return request({
    url: '/member/memberGroup/' + id,
    method: 'get'
  });
};

/**
 * 新增用户分组
 * @param data
 */
export const addMemberGroup = (data: MemberGroupForm) => {
  return request({
    url: '/member/memberGroup',
    method: 'post',
    data: data
  });
};

/**
 * 修改用户分组
 * @param data
 */
export const updateMemberGroup = (data: MemberGroupForm) => {
  return request({
    url: '/member/memberGroup',
    method: 'put',
    data: data
  });
};

/**
 * 删除用户分组
 * @param id
 */
export const delMemberGroup = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberGroup/' + id,
    method: 'delete'
  });
};
