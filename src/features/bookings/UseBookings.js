import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';

export function useBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filterName = searchParams.get('status');
  const filter =
    filterName === 'all' || !filterName
      ? null
      : { field: 'status', value: filterName };

  // SORT
  const sortByRow = searchParams.get('sortBy');
  const [field, direction] = sortByRow?.split('-') || [];

  const sortBy = sortByRow ? { field, direction } : null;

  const { isLoading, data: bookings } = useQuery({
    queryKey: ['bookings', filter, sortBy],
    queryFn: () => getBookings(filter, sortBy),
  });

  return { isLoading, bookings };
}
