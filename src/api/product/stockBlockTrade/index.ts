import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockBlockTradeVO, StockBlockTradeForm, StockBlockTradeQuery } from '@/api/product/stockBlockTrade/types';

/**
 * 查询大宗交易列表
 * @param query
 * @returns {*}
 */

export const listStockBlockTrade = (query?: StockBlockTradeQuery): AxiosPromise<StockBlockTradeVO[]> => {
  return request({
    url: '/product/stockBlockTrade/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询大宗交易详细
 * @param id
 */
export const getStockBlockTrade = (id: string | number): AxiosPromise<StockBlockTradeVO> => {
  return request({
    url: '/product/stockBlockTrade/' + id,
    method: 'get'
  });
};

/**
 * 新增大宗交易
 * @param data
 */
export const addStockBlockTrade = (data: StockBlockTradeForm) => {
  return request({
    url: '/product/stockBlockTrade',
    method: 'post',
    data: data
  });
};

/**
 * 修改大宗交易
 * @param data
 */
export const updateStockBlockTrade = (data: StockBlockTradeForm) => {
  return request({
    url: '/product/stockBlockTrade',
    method: 'put',
    data: data
  });
};

/**
 * 锁仓处理新股申购
 * @param id
 */
export const lockStockBlock = (data: any) => {
  return request({
    url: '/product/stockBlockTrade/lock',
    method: 'post',
    data: data
  });
};

/**
 * 删除大宗交易
 * @param id
 */
export const delStockBlockTrade = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockBlockTrade/' + id,
    method: 'delete'
  });
};
