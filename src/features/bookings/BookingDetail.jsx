import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from 'react-icons/hi2';
import toast from 'react-hot-toast';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Spinner from '../../ui/Spinner';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';

import { useMoveBack } from '../../hooks/useMoveBack';
import useBooking from './useBooking';
import useCheckout from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading, error } = useBooking();
  const { isCheckingOut, checkout } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

  const { status, id: bookingId } = booking || {};

  const navigate = useNavigate();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  if (isLoading) return <Spinner />;

  if (error) {
    toast.error(error.message);
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status?.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      {!error && (
        <>
          <BookingDataBox booking={booking} />

          <ButtonGroup>
            {status === 'unconfirmed' && (
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                <HiArrowDownOnSquare />
                {`Check in booking #${bookingId}`}
              </Button>
            )}
            {status === 'checked-in' && (
              <Button
                onClick={() => {
                  checkout(bookingId);
                }}
                disabled={isCheckingOut}
              >
                <HiArrowUpOnSquare />
                {`Check out booking #${bookingId}`}
              </Button>
            )}
            <Modal>
              <Modal.Open opens="confirm-delete-booking">
                <Button variation="danger">
                  <HiTrash />
                  Delete
                </Button>
              </Modal.Open>
              <Modal.Window name="confirm-delete-booking">
                <ConfirmDelete
                  resourceName="booking"
                  onConfirm={() => {
                    deleteBooking(bookingId, {
                      onSettled: () => navigate(-1),
                    });
                  }}
                  disabled={isDeleting}
                />
              </Modal.Window>
            </Modal>
            <Button variation="secondary" onClick={moveBack}>
              Back
            </Button>
          </ButtonGroup>
        </>
      )}
    </>
  );
}

export default BookingDetail;
