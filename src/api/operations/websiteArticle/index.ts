import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { WebsiteArticleVO, WebsiteArticleForm, WebsiteArticleQuery } from '@/api/operations/websiteArticle/types';

/**
 * 查询站点-文章管理列表
 * @param query
 * @returns {*}
 */

export const listWebsiteArticle = (query?: WebsiteArticleQuery): AxiosPromise<WebsiteArticleVO[]> => {
  return request({
    url: '/operations/websiteArticle/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询站点-文章管理详细
 * @param id
 */
export const getWebsiteArticle = (id: string | number): AxiosPromise<WebsiteArticleVO> => {
  return request({
    url: '/operations/websiteArticle/' + id,
    method: 'get'
  });
};

/**
 * 新增站点-文章管理
 * @param data
 */
export const addWebsiteArticle = (data: WebsiteArticleForm) => {
  return request({
    url: '/operations/websiteArticle',
    method: 'post',
    data: data
  });
};

/**
 * 修改站点-文章管理
 * @param data
 */
export const updateWebsiteArticle = (data: WebsiteArticleForm) => {
  return request({
    url: '/operations/websiteArticle',
    method: 'put',
    data: data
  });
};

/**
 * 删除站点-文章管理
 * @param id
 */
export const delWebsiteArticle = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/websiteArticle/' + id,
    method: 'delete'
  });
};
