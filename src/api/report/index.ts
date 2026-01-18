import request from '@/utils/request';

/**
 * 系统时间
 */
export const getSysTime = () => {
  return request({
    url: '/report/sysTime',
    method: 'get'
  });
};

/**
 * 首页报表
 */
export const getHomeReport = () => {
  return request({
    url: '/report/home',
    method: 'get'
  });
};

/**
 * 终端报表
 */
export const getTerminalReport = (params: any) => {
  return request({
    url: '/report/terminal',
    method: 'get',
    params: params
  });
};

/**
 * 代理报表
 */
export const getProxyReport = (params: any) => {
  return request({
    url: '/report/proxy',
    method: 'get',
    params: params
  });
};

/**
 * 充值报表
 */
export const getDepositReport = (params: any) => {
  return request({
    url: '/report/firstDeposit',
    method: 'get',
    params: params
  });
};
