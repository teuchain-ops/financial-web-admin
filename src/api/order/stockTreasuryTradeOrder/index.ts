import request from '@/utils/request';
import { StockTreasuryTradeOrderVO, StockTreasuryTradeOrderQuery, StockTreasuryTradeOrderForm } from './types';
import { AxiosPromise } from 'axios';

// 查询库藏股交易订单列表
export const listStockTreasuryTradeOrder = (query?: StockTreasuryTradeOrderQuery): AxiosPromise<StockTreasuryTradeOrderVO[]> => {
  return request({
    url: '/order/stockCollectionTradeOrder/list',
    method: 'get',
    params: query
  });
};

// 查询库藏股交易订单详情
export const getStockTreasuryTradeOrder = (id: string | number): AxiosPromise<StockTreasuryTradeOrderVO> => {
  return request({
    url: '/order/stockCollectionTradeOrder/' + id,
    method: 'get'
  });
};

// 新增库藏股交易订单
export const addStockTreasuryTradeOrder = (data: StockTreasuryTradeOrderForm): AxiosPromise<void> => {
  return request({
    url: '/order/stockCollectionTradeOrder',
    method: 'post',
    data: data
  });
};

// 修改库藏股交易订单
export const updateStockTreasuryTradeOrder = (data: StockTreasuryTradeOrderForm): AxiosPromise<void> => {
  return request({
    url: '/order/stockCollectionTradeOrder',
    method: 'put',
    data: data
  });
};

// 删除库藏股交易订单
export const delStockTreasuryTradeOrder = (id: string | number | Array<string | number>): AxiosPromise<void> => {
  return request({
    url: '/order/stockCollectionTradeOrder/' + id,
    method: 'delete'
  });
};

// 审核库藏股交易订单
export const auditStockTreasuryTradeOrder = (data: any): AxiosPromise<void> => {
  return request({
    url: '/order/stockCollectionTradeOrder/audit',
    method: 'post',
    data: data
  });
};

// 批量审核库藏股交易订单
export const batchAuditStockTreasuryTradeOrder = (data: any): AxiosPromise<void> => {
  return request({
    url: '/order/stockCollectionTradeOrder/batchAudit',
    method: 'put',
    data: data
  });
};
