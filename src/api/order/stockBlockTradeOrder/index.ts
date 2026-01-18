import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockBlockTradeOrderVO, StockBlockTradeOrderForm, StockBlockTradeOrderQuery } from '@/api/order/stockBlockTradeOrder/types';

/**
 * 查询大宗交易订单列表
 * @param query
 * @returns {*}
 */

export const listStockBlockTradeOrder = (query?: StockBlockTradeOrderQuery): AxiosPromise<StockBlockTradeOrderVO[]> => {
  return request({
    url: '/order/stockBlockTradeOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询大宗交易订单详细
 * @param id
 */
export const getStockBlockTradeOrder = (id: string | number): AxiosPromise<StockBlockTradeOrderVO> => {
  return request({
    url: '/order/stockBlockTradeOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增大宗交易订单
 * @param data
 */
export const addStockBlockTradeOrder = (data: StockBlockTradeOrderForm) => {
  return request({
    url: '/order/stockBlockTradeOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改大宗交易订单
 * @param data
 */
export const updateStockBlockTradeOrder = (data: StockBlockTradeOrderForm) => {
  return request({
    url: '/order/stockBlockTradeOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除大宗交易订单
 * @param id
 */
export const delStockBlockTradeOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockBlockTradeOrder/' + id,
    method: 'delete'
  });
};

/**
 * 审核大宗交易订单
 * @param data
 */
export const auditStockBlockTradeOrder = (data: any) => {
  return request({
    url: '/order/stockBlockTradeOrder/audit',
    method: 'post',
    data: data
  });
};

/**
 * 批量审核大宗交易订单
 * @param data
 */
export const batchAuditStockBlockTradeOrder = (data: any) => {
  return request({
    url: '/order/stockBlockTradeOrder/batchAudit',
    method: 'put',
    data: data
  });
};
