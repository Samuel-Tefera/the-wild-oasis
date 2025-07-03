import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';

import { useCabins } from './useCabins';

export default function CabinTable() {
  const { isLoading, cabins } = useCabins();

  const [searchParams] = useSearchParams();
  const filterdName = searchParams.get('discount') || 'all';

  let filterdCabins = cabins;
  if (filterdName === 'no-discount')
    filterdCabins = filterdCabins.filter((cabin) => cabin.discount === 0);
  if (filterdName === 'with-discount')
    filterdCabins = filterdCabins.filter((cabin) => cabin.discount > 0);

  if (isLoading) return <Spinner />;

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
          data={filterdCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}
