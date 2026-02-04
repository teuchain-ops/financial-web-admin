import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockVO, StockForm, StockQuery } from '@/api/product/stock/types';

/**
 * 查询股票产品列表
 * @param query
 * @returns {*}
 */

export const aiListStock = (query?: StockQuery): AxiosPromise<StockVO[]> => {
  return request({
    url: '/order/aiOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询股票产品详细
 * @param id
 */
export const getAiStock = (id: string | number): AxiosPromise<StockVO> => {
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
export const updateAiStock = (data: StockForm) => {
  return request({
    url: '/order/aiOrder/audit',
    method: 'post',
    data: data
  });
};

export const aiBuy = (data: any) => {
  return request({
    url: '/order/aiOrder/buy',
    method: 'post',
    data: data
  });
};

export const aiSell = (id: string | number) => {
  return request({
    url: '/order/aiOrder/sell',
    method: 'get',
    params: { id }
  });
};

export const aiEnd = (id: string | number) => {
  return request({
    url: '/order/aiOrder/end',
    method: 'get',
    params: { id }
  });
};

export const getAiOrderList = (query: any) => {
  return request({
    url: '/order/aiOrder/aiOrderList',
    method: 'get',
    params: query
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
