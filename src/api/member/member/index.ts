import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberVO, MemberForm, MemberQuery } from '@/api/member/member/types';

/**
 * 查询会员列表
 * @param query
 * @returns {*}
 */

export const listMember = (query?: MemberQuery): AxiosPromise<MemberVO[]> => {
  return request({
    url: '/member/list',
    method: 'get',
    params: query
  });
};

/**Ï
 * 查询会员详细
 * @param id
 */
export const getMember = (id: string | number): AxiosPromise<MemberVO> => {
  return request({
    url: '/member/' + id,
    method: 'get'
  });
};

/**
 * 新增会员
 * @param data
 */
export const addMember = (data: MemberForm) => {
  return request({
    url: '/member',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员
 * @param data
 */
export const updateMember = (data: MemberForm) => {
  return request({
    url: '/member',
    method: 'put',
    data: data
  });
};

/**
 * 修改上级用户
 * @param data
 */
export const updateInviter = (data: MemberForm) => {
  return request({
    url: '/member/inviter',
    method: 'put',
    data: data
  });
};

/**
 * 修改信用分
 * @param data
 */
export const updateCreditScore = (data: any) => {
  return request({
    url: '/member/creditScore',
    method: 'put',
    data: data
  });
};

/**
 * 人工出入款
 * @param data
 */
export const adjustMoney = (data: MemberForm) => {
  return request({
    url: '/member/adjustMoney',
    method: 'post',
    data: data
  });
};

/**
 * 人工入款记录
 * @param query
 * @returns {*}
 */
export const systemDepositList = (query?: any) => {
  return request({
    url: '/member/systemDepositList',
    method: 'get',
    params: query
  });
};

/**
 * 人工出款记录
 * @param query
 * @returns {*}
 */
export const systemWithdrawList = (query?: any) => {
  return request({
    url: '/member/systemWithdrawList',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员资金日志
 * @param query
 * @returns {*}
 */

export const listMemberAmountLog = (query: any) => {
  return request({
    url: '/member/memberAmountLog/pageList',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员列表
 * @param query
 */
export const listVoByName = (query?: MemberQuery): AxiosPromise<MemberVO[]> => {
  return request({
    url: '/member/listVoByName',
    method: 'get',
    params: query
  });
};
