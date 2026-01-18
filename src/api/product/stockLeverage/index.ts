import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { stockLeverageVO, stockLeverageForm, stockLeverageQuery } from '@/api/product/stockLeverage/types';

/**
 * 查询新股申购列表
 * @param query
 * @returns {*}
 */

export const liststockLeverage = (query?: stockLeverageQuery): AxiosPromise<stockLeverageVO[]> => {
  return request({
    url: '/product/stockLeverage/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询新股申购详细
 * @param id
 */
export const getstockLeverage = (id: string | number): AxiosPromise<stockLeverageVO> => {
  return request({
    url: '/product/stockLeverage/' + id,
    method: 'get'
  });
};

/**
 * 新增新股申购
 * @param data
 */
export const addstockLeverage = (data: stockLeverageForm) => {
  return request({
    url: '/product/stockLeverage',
    method: 'post',
    data: data
  });
};

/**
 * 修改新股申购
 * @param data
 */
export const updatestockLeverage = (data: stockLeverageForm) => {
  return request({
    url: '/product/stockLeverage',
    method: 'put',
    data: data
  });
};

/**
 * 删除新股申购
 * @param id
 */
export const delstockLeverage = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockLeverage/' + id,
    method: 'delete'
  });
};
