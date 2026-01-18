import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { InfoNewsVO, InfoNewsForm, InfoNewsQuery } from '@/api/operations/infoNews/types';

/**
 * 查询列表
 * @param query
 * @returns {*}
 */

export const listData = (query?: InfoNewsQuery): AxiosPromise<InfoNewsVO[]> => {
  return request({
    url: '/operations/infoNews/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询详细
 * @param id
 */
export const getDetail = (id: string | number): AxiosPromise<InfoNewsVO> => {
  return request({
    url: '/operations/infoNews/' + id,
    method: 'get'
  });
};

/**
 * 新增
 * @param data
 */
export const addData = (data: InfoNewsForm) => {
  return request({
    url: '/operations/infoNews',
    method: 'post',
    data: data
  });
};

/**
 * 修改
 * @param data
 */
export const updateData = (data: InfoNewsForm) => {
  return request({
    url: '/operations/infoNews',
    method: 'put',
    data: data
  });
};

/**
 * 删除
 * @param id
 */
export const deleteData = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/infoNews/' + id,
    method: 'delete'
  });
};
