import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SystemWithdrawVO, SystemWithdrawForm, SystemWithdrawQuery } from '@/api/money/systemWithdraw/types';

/**
 * 查询系统出款列表
 * @param query
 * @returns {*}
 */
export const listSystemWithdraw = (query?: SystemWithdrawQuery): AxiosPromise<SystemWithdrawVO[]> => {
  return request({
    url: '/money/systemWithdraw/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询系统出款详细
 * @param id
 */
export const getSystemWithdraw = (id: string | number): AxiosPromise<SystemWithdrawVO> => {
  return request({
    url: '/money/systemWithdraw/' + id,
    method: 'get'
  });
};

/**
 * 新增系统出款
 * @param data
 */
export const addSystemWithdraw = (data: SystemWithdrawForm) => {
  return request({
    url: '/money/systemWithdraw',
    method: 'post',
    data: data
  });
};

/**
 * 修改系统出款
 * @param data
 */
export const updateSystemWithdraw = (data: SystemWithdrawForm) => {
  return request({
    url: '/money/systemWithdraw',
    method: 'put',
    data: data
  });
};

/**
 * 删除系统出款
 * @param id
 */
export const delSystemWithdraw = (id: string | number | Array<string | number>) => {
  return request({
    url: '/money/systemWithdraw/' + id,
    method: 'delete'
  });
};

/**
 * 统计系统入款
 * @param query
 * @returns {*}
 */
export const statisticsSystemWithdraw = (query?: SystemWithdrawQuery): AxiosPromise<any[]> => {
  return request({
    url: '/money/systemWithdraw/statistics',
    method: 'get',
    params: query
  });
};
