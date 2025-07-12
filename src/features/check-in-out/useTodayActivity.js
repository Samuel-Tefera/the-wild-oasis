import { useQuery } from '@tanstack/react-query';
import { getStaysTodayActivity } from '../../services/apiBookings';

export function useTodayActivity() {
  const { isLoading, data: bookingActivity } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ['bookingActivity'],
  });

  return { isLoading, bookingActivity };
}
