import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockWarehouseVO, StockWarehouseForm, StockWarehouseQuery } from '@/api/order/stockWarehouse/types';

/**
 * 查询股票持仓列表
 * @param query
 * @returns {*}
 */

export const listStockWarehouse = (query?: StockWarehouseQuery): AxiosPromise<StockWarehouseVO[]> => {
  return request({
    url: '/order/stockWarehouse/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询股票持仓详细
 * @param id
 */
export const getStockWarehouse = (id: string | number): AxiosPromise<StockWarehouseVO> => {
  return request({
    url: '/order/stockWarehouse/' + id,
    method: 'get'
  });
};

/**
 * 新增股票持仓
 * @param data
 */
export const addStockWarehouse = (data: StockWarehouseForm) => {
  return request({
    url: '/order/stockWarehouse',
    method: 'post',
    data: data
  });
};

/**
 * 修改股票持仓
 * @param data
 */
export const updateStockWarehouse = (data: StockWarehouseForm) => {
  return request({
    url: '/order/stockWarehouse',
    method: 'put',
    data: data
  });
};

/**
 * 删除股票持仓
 * @param id
 */
export const delStockWarehouse = (id: string | number | Array<string | number>) => {
  return request({
    url: '/order/stockWarehouse/' + id,
    method: 'delete'
  });
};

/**
 * 强制平仓
 * @param data
 */
export const sellStockWarehouse = (data: StockWarehouseForm) => {
  return request({
    url: '/order/stockWarehouse/sell',
    method: 'post',
    data: data
  });
};
