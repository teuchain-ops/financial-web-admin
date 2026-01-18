import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BankVO, BankForm, BankQuery } from '@/api/operations/bank/types';

/**
 * 查询银行列表
 * @param query
 * @returns {*}
 */

export const listBank = (query?: BankQuery): AxiosPromise<BankVO[]> => {
  return request({
    url: '/operations/bank/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询银行详细
 * @param id
 */
export const getBank = (id: string | number): AxiosPromise<BankVO> => {
  return request({
    url: '/operations/bank/' + id,
    method: 'get'
  });
};

/**
 * 新增银行
 * @param data
 */
export const addBank = (data: BankForm) => {
  return request({
    url: '/operations/bank',
    method: 'post',
    data: data
  });
};

/**
 * 修改银行
 * @param data
 */
export const updateBank = (data: BankForm) => {
  return request({
    url: '/operations/bank',
    method: 'put',
    data: data
  });
};

/**
 * 删除银行
 * @param id
 */
export const delBank = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/bank/' + id,
    method: 'delete'
  });
};

