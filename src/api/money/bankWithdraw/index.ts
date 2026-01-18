import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BankWithdrawVO, BankWithdrawForm, BankWithdrawQuery } from '@/api/money/bankWithdraw/types';

/**
 * 查询银行卡出款列表
 * @param query
 * @returns {*}
 */

export const listBankWithdraw = (query?: BankWithdrawQuery): AxiosPromise<BankWithdrawVO[]> => {
  return request({
    url: '/money/bankWithdraw/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询银行卡出款详细
 * @param id
 */
export const getBankWithdraw = (id: string | number): AxiosPromise<BankWithdrawVO> => {
  return request({
    url: '/money/bankWithdraw/' + id,
    method: 'get'
  });
};

/**
 * 修改银行卡出款
 * @param data
 */
export const updateBankWithdraw = (data: BankWithdrawForm) => {
  return request({
    url: '/money/bankWithdraw',
    method: 'put',
    data: data
  });
};

/**
 * 审核银行卡入款
 * @param data
 */
export const auditBankWithdraw = (data: any) => {
  return request({
    url: '/money/bankWithdraw/audit',
    method: 'post',
    data: data
  });
};
