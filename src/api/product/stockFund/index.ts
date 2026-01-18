import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockFundVO, StockOrderForm, StockOrderQuery, StockFundOrderQuery } from '@/api/product/stockFund/types';

/**
 * 查询基金产品列表
 * @param query
 * @returns {*}
 */

export const listStockFund = (query?: StockFundOrderQuery): AxiosPromise<StockFundVO[]> => {
  return request({
    url: '/product/stockFund/list',
    method: 'get',
    params: query
  });
};


/**
 * 查询基金产品详情
 * @param id
 */
export const getStockFund = (id: string | number): AxiosPromise<StockFundVO> => {
  return request({
    url: '/product/stockFund/' + id,
    method: 'get'
  });
};


/**
 * 增加基金产品
 * @param id
 */
export const addStockFund = (data: StockOrderForm) =>  {
  return request({
    url: '/product/stockFund',
    method: 'post',
    data: data
  });
};


/**
 * 更改基金产品
 * @param id
 */
export const updateStockFund = (data: StockOrderForm) =>  {
  return request({
    url: '/product/stockFund',
    method: 'put',
    data: data
  });
};
