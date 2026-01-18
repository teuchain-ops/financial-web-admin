import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CommissionVO, CommissionForm, CommissionQuery } from '@/api/member/commission/types';

/**
 * 查询代理佣金列表
 * @param query
 * @returns {*}
 */

export const listCommission = (query?: CommissionQuery): AxiosPromise<CommissionVO[]> => {
  return request({
    url: '/member/commission/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询代理佣金详细
 * @param id
 */
export const getCommission = (id: string | number): AxiosPromise<CommissionVO> => {
  return request({
    url: '/member/commission/' + id,
    method: 'get'
  });
};

/**
 * 新增代理佣金
 * @param data
 */
export const addCommission = (data: CommissionForm) => {
  return request({
    url: '/member/commission',
    method: 'post',
    data: data
  });
};

/**
 * 修改代理佣金
 * @param data
 */
export const updateCommission = (data: CommissionForm) => {
  return request({
    url: '/member/commission',
    method: 'put',
    data: data
  });
};

/**
 * 删除代理佣金
 * @param id
 */
export const delCommission = (id: string | number | Array<string | number>) => {
  return request({
    url: '/member/commission/' + id,
    method: 'delete'
  });
};
