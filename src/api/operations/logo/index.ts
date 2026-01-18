import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { LogoVO, LogoForm, LogoQuery } from '@/api/operations/logo/types';

/**
 * 查询logo列表
 * @param query
 * @returns {*}
 */

export const listLogo = (query?: LogoQuery): AxiosPromise<LogoVO[]> => {
  return request({
    url: '/operations/logo/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询logo详细
 * @param id
 */
export const getLogo = (id: string | number): AxiosPromise<LogoVO> => {
  return request({
    url: '/operations/logo/' + id,
    method: 'get'
  });
};

/**
 * 新增logo
 * @param data
 */
export const addLogo = (data: LogoForm) => {
  return request({
    url: '/operations/logo',
    method: 'post',
    data: data
  });
};

/**
 * 修改logo
 * @param data
 */
export const updateLogo = (data: LogoForm) => {
  return request({
    url: '/operations/logo',
    method: 'put',
    data: data
  });
};

/**
 * 删除logo
 * @param id
 */
export const delLogo = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/logo/' + id,
    method: 'delete'
  });
};
