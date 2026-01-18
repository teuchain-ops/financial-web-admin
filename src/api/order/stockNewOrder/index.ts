import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockNewOrderVO, StockNewOrderForm, StockNewOrderQuery } from '@/api/order/stockNewOrder/types';

/**
 * 查询新股申购订单列表
 * @param query
 * @returns {*}
 */

export const listStockNewOrder = (query?: StockNewOrderQuery): AxiosPromise<StockNewOrderVO[]> => {
  return request({
    url: '/order/stockNewOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询新股申购订单详细
 * @param id
 */
export const getStockNewOrder = (id: string | number): AxiosPromise<StockNewOrderVO> => {
  return request({
    url: '/order/stockNewOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增新股申购订单
 * @param data
 */
export const addStockNewOrder = (data: StockNewOrderForm) => {
  return request({
    url: '/order/stockNewOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改新股申购订单
 * @param data
 */
export const updateStockNewOrder = (data: StockNewOrderForm) => {
  return request({
    url: '/order/stockNewOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除新股申购订单
 * @param id
 */
export const delStockNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockNewOrder/' + id,
    method: 'delete'
  });
};

/**
 * 取消新股申购订单
 * @param id
 */
export const cancelStockNewOrder = (id: string | number) => {
  return request({
    url: '/order/stockNewOrder/cancel/' + id,
    method: 'put'
  });
};

/**
 * 批量修改新股申购订单
 * @param data
 */
export const batchUpdateStockNewOrder = (data: StockNewOrderForm) => {
  return request({
    url: '/order/stockNewOrder/batch',
    method: 'put',
    data: data
  });
};

/**
 * 批量审核新股申购订单
 */
export const auditStockNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockNewOrder/audit/' + id,
    method: 'put'
  });
};

/**
 * 新股申购订单扣款
 */
export const deductStockNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockNewOrder/deduct/' + id,
    method: 'put'
  });
};

/**
 * 新股申购订单扣款
 */
export const conversionStockNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockNewOrder/conversion/' + id,
    method: 'put'
  });
};
