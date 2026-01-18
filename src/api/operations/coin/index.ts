import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CoinVO, CoinForm, CoinQuery } from '@/api/operations/coin/types';

/**
 * 查询币种列表
 * @param query
 * @returns {*}
 */

export const listCoin = (query?: CoinQuery): AxiosPromise<CoinVO[]> => {
  return request({
    url: '/operations/coin/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询币种详细
 * @param id
 */
export const getCoin = (id: string | number): AxiosPromise<CoinVO> => {
  return request({
    url: '/operations/coin/' + id,
    method: 'get'
  });
};

/**
 * 新增币种
 * @param data
 */
export const addCoin = (data: CoinForm) => {
  return request({
    url: '/operations/coin',
    method: 'post',
    data: data
  });
};

/**
 * 修改币种
 * @param data
 */
export const updateCoin = (data: CoinForm) => {
  return request({
    url: '/operations/coin',
    method: 'put',
    data: data
  });
};

/**
 * 删除币种
 * @param id
 */
export const delCoin = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/coin/' + id,
    method: 'delete'
  });
};
