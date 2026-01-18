import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { StockArticleVO, StockArticleForm, StockArticleQuery } from '@/api/product/stockArticle/types';

/**
 * 查询股市资讯列表
 * @param query
 * @returns {*}
 */

export const listStockArticle = (query?: StockArticleQuery): AxiosPromise<StockArticleVO[]> => {
  return request({
    url: '/product/stockArticle/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询股市资讯详细
 * @param id
 */
export const getStockArticle = (id: string | number): AxiosPromise<StockArticleVO> => {
  return request({
    url: '/product/stockArticle/' + id,
    method: 'get'
  });
};

/**
 * 新增股市资讯
 * @param data
 */
export const addStockArticle = (data: StockArticleForm) => {
  return request({
    url: '/product/stockArticle',
    method: 'post',
    data: data
  });
};

/**
 * 修改股市资讯
 * @param data
 */
export const updateStockArticle = (data: StockArticleForm) => {
  return request({
    url: '/product/stockArticle',
    method: 'put',
    data: data
  });
};

/**
 * 删除股市资讯
 * @param id
 */
export const delStockArticle = (id: string | number | Array<string | number>) => {
  return request({
    url: '/product/stockArticle/' + id,
    method: 'delete'
  });
};
