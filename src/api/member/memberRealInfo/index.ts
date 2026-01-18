import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { MemberRealInfoVO, MemberRealInfoForm, MemberRealInfoQuery } from '@/api/member/memberRealInfo/types';

/**
 * 查询会员实名信息列表
 * @param query
 * @returns {*}
 */

export const listMemberRealInfo = (query?: MemberRealInfoQuery): AxiosPromise<MemberRealInfoVO[]> => {
  return request({
    url: '/member/memberRealInfo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询会员实名信息详细
 * @param memberId
 */
export const getMemberRealInfo = (memberId: string | number): AxiosPromise<MemberRealInfoVO> => {
  return request({
    url: '/member/memberRealInfo/' + memberId,
    method: 'get'
  });
};

/**
 * 新增会员实名信息
 * @param data
 */
export const addMemberRealInfo = (data: MemberRealInfoForm) => {
  return request({
    url: '/member/memberRealInfo',
    method: 'post',
    data: data
  });
};

/**
 * 修改会员实名信息
 * @param data
 */
export const updateMemberRealInfo = (data: MemberRealInfoForm) => {
  return request({
    url: '/member/memberRealInfo',
    method: 'put',
    data: data
  });
};

/**
 * 删除会员实名信息
 * @param memberId
 */
export const delMemberRealInfo = (memberId: string | number | Array<string | number>) => {
  return request({
    url: '/member/memberRealInfo/' + memberId,
    method: 'delete'
  });
};

/**
 * 审核会员实名信息
 * @param data
 */
export const auditMemberRealInfo = (data: MemberRealInfoForm) => {
  return request({
    url: '/member/memberRealInfo/audit',
    method: 'post',
    data: data
  });
};
