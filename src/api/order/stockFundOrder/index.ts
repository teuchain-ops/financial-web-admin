import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockFundOrderVO, StockFundOrderQuery } from '@/api/order/stockFundOrder/types';


/**
 * 查询基金订单列表
 * @param query
 * @returns {*}
 */

export const listStockFundOrder = (query?: StockFundOrderQuery): AxiosPromise<StockFundOrderVO[]> => {
  return request({
    url: '/order/stockFundOrder/list',
    method: 'get',
    params: query
  });
};


/**
 * 查询基金订单详细
 * @param id
 */
export const getStockFundOrder = (id: string | number): AxiosPromise<StockFundOrderVO> => {
  return request({
    url: '/order/stockFundOrder/' + id,
    method: 'get'
  });
};