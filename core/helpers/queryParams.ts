export const getQueryParams = () => {
  const params = new URLSearchParams(
    window ? window.location.search : {}
  );

  return new Proxy(params, {
    get(target, prop: string) {
      return target.get(prop)
    },
  });
}
