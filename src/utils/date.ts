/**
 * 获取当前时间，格式化为 YYYY-MM-DD HH:mm:ss
 * @returns 格式化后的当前时间字符串
 */
export function getCurrentTime(): string {
  const date = new Date();

  // 获取年、月、日
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需+1，不足2位补0
  const day = String(date.getDate()).padStart(2, '0');

  // 获取时、分、秒
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // 拼接成指定格式
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
