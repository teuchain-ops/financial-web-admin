import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberSuggestionVO, MemberSuggestionForm, MemberSuggestionQuery } from '@/api/member/memberSuggestion/types';

/**
 * 查询用户建议列表
 * @param query
 * @returns {*}
 */

export const listMemberSuggestion = (query?: MemberSuggestionQuery): AxiosPromise<MemberSuggestionVO[]> => {
  return request({
    url: '/member/memberSuggestion/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用户建议详细
 * @param id
 */
export const getMemberSuggestion = (id: string | number): AxiosPromise<MemberSuggestionVO> => {
  return request({
    url: '/member/memberSuggestion/' + id,
    method: 'get'
  });
};

/**
 * 新增用户建议
 * @param data
 */
export const addMemberSuggestion = (data: MemberSuggestionForm) => {
  return request({
    url: '/member/memberSuggestion',
    method: 'post',
    data: data
  });
};

/**
 * 修改用户建议
 * @param data
 */
export const updateMemberSuggestion = (data: MemberSuggestionForm) => {
  return request({
    url: '/member/memberSuggestion',
    method: 'put',
    data: data
  });
};

/**
 * 删除用户建议
 * @param id
 */
export const delMemberSuggestion = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberSuggestion/' + id,
    method: 'delete'
  });
};
