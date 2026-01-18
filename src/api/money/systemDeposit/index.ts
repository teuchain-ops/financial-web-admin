import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { SystemDepositVO, SystemDepositForm, SystemDepositQuery } from '@/api/money/systemDeposit/types';

/**
 * 查询系统入款列表
 * @param query
 * @returns {*}
 */
export const listSystemDeposit = (query?: SystemDepositQuery): AxiosPromise<SystemDepositVO[]> => {
  return request({
    url: '/money/systemDeposit/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询系统入款详细
 * @param id
 */
export const getSystemDeposit = (id: string | number): AxiosPromise<SystemDepositVO> => {
  return request({
    url: '/money/systemDeposit/' + id,
    method: 'get'
  });
};

/**
 * 新增系统入款
 * @param data
 */
export const addSystemDeposit = (data: SystemDepositForm) => {
  return request({
    url: '/money/systemDeposit',
    method: 'post',
    data: data
  });
};

/**
 * 修改系统入款
 * @param data
 */
export const updateSystemDeposit = (data: SystemDepositForm) => {
  return request({
    url: '/money/systemDeposit',
    method: 'put',
    data: data
  });
};

/**
 * 删除系统入款
 * @param id
 */
export const delSystemDeposit = (id: string | number | Array<string | number>) => {
  return request({
    url: '/money/systemDeposit/' + id,
    method: 'delete'
  });
};

/**
 * 统计系统入款
 * @param query
 * @returns {*}
 */
export const statisticsSystemDeposit = (query?: SystemDepositQuery): AxiosPromise<any[]> => {
  return request({
    url: '/money/systemDeposit/statistics',
    method: 'get',
    params: query
  });
};
