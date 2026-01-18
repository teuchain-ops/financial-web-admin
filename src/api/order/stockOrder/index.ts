import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockOrderVO, StockOrderForm, StockOrderQuery } from '@/api/order/stockOrder/types';

/**
 * 查询股票交易订单列表
 * @param query
 * @returns {*}
 */

export const listStockOrder = (query?: StockOrderQuery): AxiosPromise<StockOrderVO[]> => {
  return request({
    url: '/order/stockOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询股票交易订单详细
 * @param id
 */
export const getStockOrder = (id: string | number): AxiosPromise<StockOrderVO> => {
  return request({
    url: '/order/stockOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增股票交易订单
 * @param data
 */
export const addStockOrder = (data: StockOrderForm) => {
  return request({
    url: '/order/stockOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改股票交易订单
 * @param data
 */
export const updateStockOrder = (data: StockOrderForm) => {
  return request({
    url: '/order/stockOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除股票交易订单
 * @param id
 */
export const delStockOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockOrder/' + id,
    method: 'delete'
  });
};

/**
 * 批量强制平仓
 * @param id
 */
export const batchSellStockOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockOrder/batchSell/' + id,
    method: 'put'
  });
};

/**
 * 锁仓解仓处理
 * @param data
 */
export const lockStockOrder = (data: any) => {
  return request({
    url: '/order/stockOrder/lock',
    method: 'post',
    data: data
  });
};
