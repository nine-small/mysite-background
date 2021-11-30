export function getTime(time) {
  const date = new Date(+time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const weekArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const week = weekArr[date.getDay()]
  const test = (str) => {
    if (+str < 10) {
      return `0${str}`;
    } else {
      return str;
    }
  };
  return `${year}-${test(month)}-${test(day)} ${test(hour)}:${test(minute)}:${test(second)} ${week}`;
}
