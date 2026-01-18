import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockNewVO, StockNewForm, StockNewQuery } from '@/api/product/stockNew/types';

/**
 * 查询新股申购列表
 * @param query
 * @returns {*}
 */

export const listStockNew = (query?: StockNewQuery): AxiosPromise<StockNewVO[]> => {
  return request({
    url: '/product/stockNew/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询新股申购详细
 * @param id
 */
export const getStockNew = (id: string | number): AxiosPromise<StockNewVO> => {
  return request({
    url: '/product/stockNew/' + id,
    method: 'get'
  });
};

/**
 * 新增新股申购
 * @param data
 */
export const addStockNew = (data: StockNewForm) => {
  return request({
    url: '/product/stockNew',
    method: 'post',
    data: data
  });
};

/**
 * 修改新股申购
 * @param data
 */
export const updateStockNew = (data: StockNewForm) => {
  return request({
    url: '/product/stockNew',
    method: 'put',
    data: data
  });
};

/**
 * 删除新股申购
 * @param id
 */
export const delStockNew = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockNew/' + id,
    method: 'delete'
  });
};

/**
 * 上市转股
 * @param data
 */
export const convertStockNew = (data: any) => {
  return request({
    url: '/product/stockNew/manualToStock',
    method: 'post',
    data: data
  });
};

/**
 * 获取ipo
 */
export const getIPOList = () => {
  return request({
    url: '/product/stockNew/ipoList',
    method: 'get',
  });
};
