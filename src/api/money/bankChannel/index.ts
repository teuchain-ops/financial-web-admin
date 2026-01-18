import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { BankChannelVO, BankChannelForm, BankChannelQuery } from '@/api/money/bankChannel/types';

/**
 * 查询银行卡入款通道列表
 * @param query
 * @returns {*}
 */

export const listBankChannel = (query?: BankChannelQuery): AxiosPromise<BankChannelVO[]> => {
  return request({
    url: '/money/bankChannel/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询银行卡入款通道详细
 * @param id
 */
export const getBankChannel = (id: string | number): AxiosPromise<BankChannelVO> => {
  return request({
    url: '/money/bankChannel/' + id,
    method: 'get'
  });
};

/**
 * 新增银行卡入款通道
 * @param data
 */
export const addBankChannel = (data: BankChannelForm) => {
  return request({
    url: '/money/bankChannel',
    method: 'post',
    data: data
  });
};

/**
 * 修改银行卡入款通道
 * @param data
 */
export const updateBankChannel = (data: BankChannelForm) => {
  return request({
    url: '/money/bankChannel',
    method: 'put',
    data: data
  });
};

/**
 * 删除银行卡入款通道
 * @param id
 */
export const delBankChannel = (id: string | number | Array<string | number>) => {
  return request({
    url: '/money/bankChannel/' + id,
    method: 'delete'
  });
};

/**
 * 解绑代理线
 * @param id
 */
export const unbindProxy = (id: string | number | Array<string | number>) => {
  return request({
    url: '/money/bankChannel/unbindProxy/' + id,
    method: 'put'
  });
};
