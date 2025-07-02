function applyMiddleware(...middlewares) {
  return (store) => {
    middlewares.forEach((middleware) => {
      middleware(store);
    });
  };
}

export default applyMiddleware;
