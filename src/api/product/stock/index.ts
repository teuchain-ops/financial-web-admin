import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockVO, StockForm, StockQuery } from '@/api/product/stock/types';

/**
 * 查询股票产品列表
 * @param query
 * @returns {*}
 */

export const listStock = (query?: StockQuery): AxiosPromise<StockVO[]> => {
  return request({
    url: '/product/stock/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询股票产品详细
 * @param id
 */
export const getStock = (id: string | number): AxiosPromise<StockVO> => {
  return request({
    url: '/product/stock/' + id,
    method: 'get'
  });
};

/**
 * 新增股票产品
 * @param data
 */
export const addStock = (data: StockForm) => {
  return request({
    url: '/product/stock',
    method: 'post',
    data: data
  });
};

/**
 * 修改股票产品
 * @param data
 */
export const updateStock = (data: StockForm) => {
  return request({
    url: '/product/stock',
    method: 'put',
    data: data
  });
};

/**
 * 删除股票产品
 * @param id
 */
export const delStock = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stock/' + id,
    method: 'delete'
  });
};

/**
 * 根据股票代码查询股票产品列表
 * @param stockCode
 */
export const listByStockCode = (stockCode: string): AxiosPromise<StockVO> => {
  return request({
    url: '/product/stock/listByStockCode/' + stockCode,
    method: 'get'
  });
};
