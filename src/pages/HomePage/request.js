import { uploadScore as uploadScoreRequest } from '../../network/index'

export function uploadScore(score) {
  const username = localStorage.getItem('username')
  const mobile = localStorage.getItem('mobile')
  createRequest({
    score,
    mobile,
    username,
  })
}

function createRequest(params) {
  uploadScoreRequest(params)
}
