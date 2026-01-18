import request from '@/utils/request';

/**
 * 查询国家
 */
export const getCountrySelection = () => {
  return request({
    url: '/selection/country',
    method: 'get'
  });
};

/**
 * 查询代理线
 */
export const getMemberProxySelection = () => {
  return request({
    url: '/selection/memberProxy',
    method: 'get'
  });
};

/**
 * 查询用户等级
 */
export const getLevelSelection = () => {
  return request({
    url: '/selection/memberLevel',
    method: 'get'
  });
};

/**
 * 查询用户分组
 */
export const getMemberGroupSelection = () => {
  return request({
    url: '/selection/memberGroup',
    method: 'get'
  });
};

/**
 * 查询交易所
 */
export const getStockExchangeSelection = () => {
  return request({
    url: '/selection/stockExchange',
    method: 'get'
  });
};

/**
 * 查询币种
 */
export const getCoinSelection = () => {
  return request({
    url: '/selection/coin',
    method: 'get'
  });
};
