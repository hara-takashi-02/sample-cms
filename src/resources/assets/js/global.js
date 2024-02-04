/**
 * -------------
 * vue共通処理
 * -------------
 */

/**
 * ------------
 * 共通変数
 * ------------
 */
const globalVal = [{
  uploadFile: "/storage/photos/",
  uploadMv: "/storage/movies/",
}];

/**
 * ------------
 * ソート用
 * ------------
 */
const listSort = (list, item) => {
  return list.sort((a, b) => {
    return a[item] - b[item];
  });
};

/**
 * ------------
 * ソート用(時間用)
 * ------------
 */
const listSortTime = (list, item) => {
  return list.sort((a, b) => {
    return new Date(a[item]).getTime() - new Date(b[item]).getTime();
  });
};

/**
 * -------------
 * 時間取得
 * -------------
 * @returns 
 */
const getTime = () => {
  let now = new Date();
  let Year = now.getFullYear();
  let Month = now.getMonth() + 1;
  let nowDate = now.getDate();
  let Hour = now.getHours();
  let Min = now.getMinutes();
  let Sec = now.getSeconds();
  let setDate = Year + '-' + ("0" + Month).slice(-2) + '-' + ("0" + nowDate).slice(-2) + ' ' + ("0" + Hour).slice(-2) + ':' + ("0" + Min).slice(-2) + ':' + ("0" + Sec).slice(-2)

  return setDate;
};

/**
 * -------------
 * テキストを時間に置き換え
 * -------------
 * @param {*} text 
 * @returns 
 */
const changeTime = (text) => {
  return new Date(text);
};

export default {
  globalVal,
  listSort,
  listSortTime,
  getTime,
  changeTime,
};