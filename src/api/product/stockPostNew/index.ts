import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockPostNewVO, StockPostNewForm, StockPostNewQuery } from '@/api/product/stockPostNew/types';

/**
 * 查询Post-IPO列表
 * @param query
 * @returns {*}
 */
export const listStockPostNew = (query?: StockPostNewQuery): AxiosPromise<StockPostNewVO[]> => {
  return request({
    url: '/product/stockPostNew/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询Post-IPO详细
 * @param id
 */
export const getStockPostNew = (id: string | number): AxiosPromise<StockPostNewVO> => {
  return request({
    url: '/product/stockPostNew/' + id,
    method: 'get'
  });
};

/**
 * 新增Post-IPO
 * @param data
 */
export const addStockPostNew = (data: StockPostNewForm) => {
  return request({
    url: '/product/stockPostNew',
    method: 'post',
    data: data
  });
};

/**
 * 修改Post-IPO
 * @param data
 */
export const updateStockPostNew = (data: StockPostNewForm) => {
  return request({
    url: '/product/stockPostNew',
    method: 'put',
    data: data
  });
};

/**
 * 删除Post-IPO
 * @param id
 */
export const delStockPostNew = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockPostNew/' + id,
    method: 'delete'
  });
};
