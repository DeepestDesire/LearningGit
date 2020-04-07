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
