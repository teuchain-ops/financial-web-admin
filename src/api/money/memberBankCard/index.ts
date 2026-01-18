import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberBankCardVO, MemberBankCardForm, MemberBankCardQuery } from '@/api/money/memberBankCard/types';

/**
 * 查询用户银行卡列表
 * @param query
 * @returns {*}
 */

export const listMemberBankCard = (query?: MemberBankCardQuery): AxiosPromise<MemberBankCardVO[]> => {
  return request({
    url: '/money/memberBankCard/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询用户银行卡详细
 * @param id
 */
export const getMemberBankCard = (id: string | number): AxiosPromise<MemberBankCardVO> => {
  return request({
    url: '/money/memberBankCard/' + id,
    method: 'get'
  });
};

/**
 * 新增用户银行卡
 * @param data
 */
export const addMemberBankCard = (data: MemberBankCardForm) => {
  return request({
    url: '/money/memberBankCard',
    method: 'post',
    data: data
  });
};

/**
 * 修改用户银行卡
 * @param data
 */
export const updateMemberBankCard = (data: MemberBankCardForm) => {
  return request({
    url: '/money/memberBankCard',
    method: 'put',
    data: data
  });
};

/**
 * 删除用户银行卡
 * @param id
 */
export const delMemberBankCard = (id: string | number | Array<string | number>) => {
  return request({
    url: '/money/memberBankCard/' + id,
    method: 'delete'
  });
};
