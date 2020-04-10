import axios from 'axios'

/**
 * 上传分数接口
 *
 * @param {*} params
 * @returns
 */
export function uploadScore(data) {
  return axios({
    method: 'post',
    url: '/api/score/upload',
    data,
  })
}

/**
 * 获取排行接口
 *
 * @param {*} params
 * @returns
 */
export function getTopList() {
  return axios({
    method: 'post',
    url: '/api/score/toplist',
  })
}
