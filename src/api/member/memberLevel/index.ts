import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberLevelVO, MemberLevelForm, MemberLevelQuery } from '@/api/member/memberLevel/types';

/**
 * 查询等级管理列表
 * @param query
 * @returns {*}
 */

export const listMemberLevel = (query?: MemberLevelQuery): AxiosPromise<MemberLevelVO[]> => {
  return request({
    url: '/member/memberLevel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询等级管理详细
 * @param id
 */
export const getMemberLevel = (id: string | number): AxiosPromise<MemberLevelVO> => {
  return request({
    url: '/member/memberLevel/' + id,
    method: 'get'
  });
};

/**
 * 新增等级管理
 * @param data
 */
export const addMemberLevel = (data: MemberLevelForm) => {
  return request({
    url: '/member/memberLevel',
    method: 'post',
    data: data
  });
};

/**
 * 修改等级管理
 * @param data
 */
export const updateMemberLevel = (data: MemberLevelForm) => {
  return request({
    url: '/member/memberLevel',
    method: 'put',
    data: data
  });
};

/**
 * 删除等级管理
 * @param id
 */
export const delMemberLevel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberLevel/' + id,
    method: 'delete'
  });
};
