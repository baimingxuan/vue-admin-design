// Interface data format used to return a unified format
export function resultSuccess(data, { message = '成功' } = {}) {
  return {
    type: 'success',
    code: 0,
    data,
    message
  }
}

export function resultError(message = '失败', { code = -1, data = null } = {}) {
  return {
    type: 'error',
    code,
    data,
    message
  }
}

// This function is used to get a token from the request data
export function getRequestToken({ headers }) {
  return headers?.authorization
}

export function pagination(currentPage, pageSize, array) {
  const offset = (currentPage - 1) * Number(pageSize)
  return offset + Number(pageSize) >= array.length
    ? array.slice(offset, array.length)
    : array.slice(offset, offset + Number(pageSize))
}

export function resultPageSuccess(currentPage, pageSize, list, { message = 'ok' } = {}) {
  const pageData = pagination(currentPage, pageSize, list)

  return {
    ...resultSuccess({
      list: pageData,
      total: list.length
    }),
    message
  }
}
