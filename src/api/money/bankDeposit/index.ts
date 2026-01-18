import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BankDepositVO, BankDepositForm, BankDepositQuery } from '@/api/money/bankDeposit/types';

/**
 * 查询银行卡入款列表
 * @param query
 * @returns {*}
 */

export const listBankDeposit = (query?: BankDepositQuery): AxiosPromise<BankDepositVO[]> => {
  return request({
    url: '/money/bankDeposit/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询银行卡入款详细
 * @param id
 */
export const getBankDeposit = (id: string | number): AxiosPromise<BankDepositVO> => {
  return request({
    url: '/money/bankDeposit/' + id,
    method: 'get'
  });
};

/**
 * 审核银行卡入款
 * @param data
 */
export const auditBankDeposit = (data: any) => {
  return request({
    url: '/money/bankDeposit/audit',
    method: 'post',
    data: data
  });
};


