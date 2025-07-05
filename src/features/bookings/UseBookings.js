import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constant';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClinet = useQueryClient();

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

  // PAGING
  const page = +searchParams.get('page') || 1;

  const { isLoading, data } = useQuery({
    queryKey: ['bookings', filter, sortBy, page],
    queryFn: () => getBookings(filter, sortBy, page),
  });

  const { data: bookings, count } = data || {};

  // PRE-FETCH
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClinet.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page + 1],
      queryFn: () => getBookings(filter, sortBy, page + 1),
    });

  if (page > 1)
    queryClinet.prefetchQuery({
      queryKey: ['bookings', filter, sortBy, page - 1],
      queryFn: () => getBookings(filter, sortBy, page - 1),
    });

  return { isLoading, bookings, count };
}
