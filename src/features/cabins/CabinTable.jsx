import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

import { useCabins } from './useCabins';
import Empty from '../../ui/Empty';

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();

  // 1. Filter
  const filterdBy = searchParams.get('discount') || 'all';

  let filterdCabins = cabins;

  if (filterdBy === 'no-discount')
    filterdCabins = filterdCabins?.filter((cabin) => cabin.discount === 0);
  if (filterdBy === 'with-discount')
    filterdCabins = filterdCabins?.filter((cabin) => cabin.discount > 0);

  // 2. Sort
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedCabins = filterdCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;

  if (!cabins || cabins.length === 0) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
