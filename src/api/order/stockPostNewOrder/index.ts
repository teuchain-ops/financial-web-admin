import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockPostNewOrderVO, StockPostNewOrderForm, StockPostNewOrderQuery } from '@/api/order/stockPostNewOrder/types';

/**
 * 查询Post-IPO订单列表
 * @param query
 * @returns {*}
 */
export const listStockPostNewOrder = (query?: StockPostNewOrderQuery): AxiosPromise<StockPostNewOrderVO[]> => {
  return request({
    url: '/order/stockPostNewOrder/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询Post-IPO订单详细
 * @param id
 */
export const getStockPostNewOrder = (id: string | number): AxiosPromise<StockPostNewOrderVO> => {
  return request({
    url: '/order/stockPostNewOrder/' + id,
    method: 'get'
  });
};

/**
 * 新增Post-IPO订单
 * @param data
 */
export const addStockPostNewOrder = (data: StockPostNewOrderForm) => {
  return request({
    url: '/order/stockPostNewOrder',
    method: 'post',
    data: data
  });
};

/**
 * 修改Post-IPO订单
 * @param data
 */
export const updateStockPostNewOrder = (data: StockPostNewOrderForm) => {
  return request({
    url: '/order/stockPostNewOrder',
    method: 'put',
    data: data
  });
};

/**
 * 删除Post-IPO订单
 * @param id
 */
export const delStockPostNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockPostNewOrder/' + id,
    method: 'delete'
  });
};

/**
 * 中签设置Post-IPO订单
 * @param data
 */
export const obtainStockPostNewOrder = (data: StockPostNewOrderForm) => {
  return request({
    url: '/order/stockPostNewOrder/obtain',
    method: 'put',
    data: data
  });
};

/**
 * 取消新股申购订单
 * @param id
 */
export const cancelStockPostNewOrder = (id: string | number) => {
  return request({
    url: '/order/stockPostNewOrder/cancel/' + id,
    method: 'put'
  });
};

/**
 * 批量中签设置Post-IPO订单
 * @param data
 */
export const batchUpdateStockPostNewOrder = (data: StockPostNewOrderForm) => {
  return request({
    url: '/order/stockPostNewOrder/batch',
    method: 'put',
    data: data
  });
};

/**
 * 批量审核新股申购订单
 */
export const auditStockPostNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockPostNewOrder/audit/' + id,
    method: 'put'
  });
};

/**
 * 新股申购订单扣款
 */
export const deductStockPostNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockPostNewOrder/deduct/' + id,
    method: 'put'
  });
};

/**
 * 新股申购订单扣款
 */
export const conversionStockPostNewOrder = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockPostNewOrder/conversion/' + id,
    method: 'put'
  });
};
