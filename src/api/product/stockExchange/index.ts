import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockExchangeVO, StockExchangeForm, StockExchangeQuery } from '@/api/product/stockExchange/types';

/**
 * 查询股票交易所列表
 * @param query
 * @returns {*}
 */

export const listStockExchange = (query?: StockExchangeQuery): AxiosPromise<StockExchangeVO[]> => {
  return request({
    url: '/product/stockExchange/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询股票交易所详细
 * @param id
 */
export const getStockExchange = (id: string | number): AxiosPromise<StockExchangeVO> => {
  return request({
    url: '/product/stockExchange/' + id,
    method: 'get'
  });
};

/**
 * 新增股票交易所
 * @param data
 */
export const addStockExchange = (data: StockExchangeForm) => {
  return request({
    url: '/product/stockExchange',
    method: 'post',
    data: data
  });
};

/**
 * 修改股票交易所
 * @param data
 */
export const updateStockExchange = (data: StockExchangeForm) => {
  return request({
    url: '/product/stockExchange',
    method: 'put',
    data: data
  });
};

/**
 * 删除股票交易所
 * @param id
 */
export const delStockExchange = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockExchange/' + id,
    method: 'delete'
  });
};
