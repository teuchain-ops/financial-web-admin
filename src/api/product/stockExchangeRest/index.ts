import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockExchangeRestVO, StockExchangeRestForm, StockExchangeRestQuery } from '@/api/product/stockExchangeRest/types';

/**
 * 查询休市日设置列表
 * @param query
 * @returns {*}
 */

export const listStockExchangeRest = (query?: StockExchangeRestQuery): AxiosPromise<StockExchangeRestVO[]> => {
  return request({
    url: '/product/stockExchangeRest/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询休市日设置详细
 * @param id
 */
export const getStockExchangeRest = (id: string | number): AxiosPromise<StockExchangeRestVO> => {
  return request({
    url: '/product/stockExchangeRest/' + id,
    method: 'get'
  });
};

/**
 * 新增休市日设置
 * @param data
 */
export const addStockExchangeRest = (data: StockExchangeRestForm) => {
  return request({
    url: '/product/stockExchangeRest',
    method: 'post',
    data: data
  });
};

/**
 * 修改休市日设置
 * @param data
 */
export const updateStockExchangeRest = (data: StockExchangeRestForm) => {
  return request({
    url: '/product/stockExchangeRest',
    method: 'put',
    data: data
  });
};

/**
 * 删除休市日设置
 * @param id
 */
export const delStockExchangeRest = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockExchangeRest/' + id,
    method: 'delete'
  });
};
