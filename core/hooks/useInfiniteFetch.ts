import isEqual from 'lodash/isEqual';
import { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';

const createParams = ({ count, firstRow, sorting = null, filters = null }: any) => {
  let params: any = { limitation: { count, firstRow } };
  if (sorting) params.sorting = { ...sorting };
  if (filters) params = { ...params, ...filters };
  return params;
};

export const useInfiniteFetch = ({
  service,
  serviceCount,
  count = 50,
  sorting = null,
  filters = null,
  tag = null,
  argReady= true
}: any) => {
  const [amount, setAmount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [prevSorting, setPrevSorting] = useState(sorting);
  const [prevFilters, setPrevFilter] = useState(filters);
  const [params, setParams] = useState(createParams({ count, firstRow: 0, sorting, filters, tag }));
  const [data, setData] = useState([]);

  const loadData = (): void => {
    if (serviceCount && params.limitation.firstRow === 0) {
      const countParams = { ...filters };
      serviceCount(countParams)
        .then((response: any) => setAmount(response))
        .catch((error: any) => console.log(error));
    }
    setIsFetching(true);
    service(params)
      .then((response: any) => {
        setIsFetching(false);
        const newData = params.limitation.firstRow === 0 ? response : [...data, ...response];
        setData(newData);
        setHasNextPage(newData.length === params.limitation.firstRow + params.limitation.count);
      })
      .catch(() => {
        setIsFetching(false);
        setHasNextPage(false);
      });
  };

  const loadMore = (): void => {
    setParams(
      createParams({ count, firstRow: params.limitation.firstRow + params.limitation.count, sorting, filters, tag }),
    );
  };

  const reLoad = (): void => {
    setParams(createParams({ count, firstRow: 0, sorting, filters, tag }));
  };

  const [infiniteRef] = useInfiniteScroll({
    loading: isFetching,
    hasNextPage,
    onLoadMore: loadMore,
  });

  useEffect(() => {
    if(argReady) loadData();
  }, [params]);

  useEffect(() => {
    if (!isEqual(prevFilters, filters)) {
      setPrevFilter(filters);
      reLoad();
    }
  }, [filters]);

  useEffect(() => {
    if (!isEqual(prevSorting, sorting)) {
      setPrevSorting(sorting);
      reLoad();
    }
  }, [sorting]);

  return { infiniteRef, data, loadMore, isFetching, params, reLoad, hasNextPage, amount };
};
