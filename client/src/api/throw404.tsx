import Error from 'next/error'

export const throw404 = () => {
  const e = new Error({statusCode: 404, title: "Not found"});
  throw e
}