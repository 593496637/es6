let BASE_URL = ''
if (import.meta.env.DEV) {
  BASE_URL = 'http://www.codercba.com:8000'
} else {
  BASE_URL = 'http://www.codercba.com:8000'
}

export { BASE_URL }
export const TIME_OUT = 10000
