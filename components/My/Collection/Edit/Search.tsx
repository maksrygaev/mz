import React from 'react';
import Card from 'components/Common/Card';
import SearchLayout from 'components/Common/Search/Layout';
import ListResult from 'components/Common/Search/List';
import ResultCounter from 'components/Common/Search/ResultCounter';
import SelectedFacets from 'components/Common/Search/SelectedFacets';
import SearchField from 'components/Common/Search/SearchField/input';
import { mock } from 'components/Common/Search/__mock';
import FacetsBlock from './Facets';

const isLoading = false; // TODO: remove it, temporary

const CollectionEditSearch: React.FC = () => {
/*  const onSort = (value: string) => {
    console.log('sort value', value);
  };

  const onRemove = (e: any) => {
    console.log(e.target.value);
  };*/

  return (
    <>
      <SearchField name="search-collection" onSearch={() => null} isBottomSpace />
{/*      <SearchLayout
        onClear={() => null}
        filterContent={<FacetsBlock isLoading={isLoading} facets={mock.data?.facets} />}
        resultContent={
          <ListResult
            isLoading={isLoading}
            errors={mock.errors}
            data={mock.data}
            renderListItem={({ item, isLoading }) => (
              <Card
                href={`/collection/${item?.id}`}
                image={item?.image}
                likes={item?.likes}
                price={item?.price}
                title={item?.title}
                isLoading={isLoading}
                avatar={item?.avatar}
              />
            )}
            counterElement={
              <ResultCounter count={mock.data?.total} isLoading={isLoading} onSort={onSort} />
            }
            selectedFacets={
              <SelectedFacets
                selectedFacets={[{ text: 'Facet 1' }]} // TODO: change mock to the  real data
                isLoading={isLoading}
                onRemove={onRemove}
              />
            }
          />
        }
      />*/}
    </>
  );
};

export default CollectionEditSearch;
