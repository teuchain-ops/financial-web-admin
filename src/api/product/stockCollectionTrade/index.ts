import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockCollectionTradeVO, StockCollectionTradeForm, StockCollectionTradeQuery } from '@/api/product/stockCollectionTrade/types';

/**
 * 查询库藏股交易列表
 * @param query
 * @returns {*}
 */

export const listStockCollectionTrade = (query?: StockCollectionTradeQuery): AxiosPromise<StockCollectionTradeVO[]> => {
  return request({
    url: '/product/stockCollectionTrade/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询库藏股交易详细
 * @param id
 */
export const getStockCollectionTrade = (id: string | number): AxiosPromise<StockCollectionTradeVO> => {
  return request({
    url: '/product/stockCollectionTrade/' + id,
    method: 'get'
  });
};

/**
 * 新增库藏股交易
 * @param data
 */
export const addStockCollectionTrade = (data: StockCollectionTradeForm) => {
  return request({
    url: '/product/stockCollectionTrade',
    method: 'post',
    data: data
  });
};

/**
 * 修改库藏股交易
 * @param data
 */
export const updateStockCollectionTrade = (data: StockCollectionTradeForm) => {
  return request({
    url: '/product/stockCollectionTrade',
    method: 'put',
    data: data
  });
};

/**
 * 锁仓库藏股交易
 * @param data
 */
export const lockStockCollection = (data: any) => {
  return request({
    url: '/product/stockCollectionTrade/lock',
    method: 'post',
    data: data
  });
};

/**
 * 导出库藏股交易
 * @param query
 */
export const exportStockCollectionTrade = (query?: StockCollectionTradeQuery) => {
  return request({
    url: '/product/stockCollectionTrade/export',
    method: 'post',
    params: query
  });
};

/**
 * 删除库藏股交易
 * @param id
 */
export const delStockCollectionTrade = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockCollectionTrade/' + id,
    method: 'delete'
  });
};
