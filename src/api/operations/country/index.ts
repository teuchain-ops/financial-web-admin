import request from '@/utils/request';
import { AxiosPromise } from 'axios';
import { CountryVO, CountryForm, CountryQuery } from '@/api/operations/country/types';

/**
 * 查询国家列表
 * @param query
 * @returns {*}
 */

export const listCountry = (query?: CountryQuery): AxiosPromise<CountryVO[]> => {
  return request({
    url: '/operations/country/list',
    method: 'get',
    params: query
  });
};

/**
 * 查询国家详细
 * @param id
 */
export const getCountry = (id: string | number): AxiosPromise<CountryVO> => {
  return request({
    url: '/operations/country/' + id,
    method: 'get'
  });
};

/**
 * 新增国家
 * @param data
 */
export const addCountry = (data: CountryForm) => {
  return request({
    url: '/operations/country',
    method: 'post',
    data: data
  });
};

/**
 * 修改国家
 * @param data
 */
export const updateCountry = (data: CountryForm) => {
  return request({
    url: '/operations/country',
    method: 'put',
    data: data
  });
};

/**
 * 删除国家
 * @param id
 */
export const delCountry = (id: string | number | Array<string | number>) => {
  return request({
    url: '/operations/country/' + id,
    method: 'delete'
  });
};
