import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { PAGE_SIZE } from '../utils/constant';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)'};
  color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

export default function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get('page') || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function toNextPage() {
    if (currentPage === pageCount) return;
    searchParams.set('page', currentPage + 1);
    setSearchParams(searchParams);
  }

  function toPrevPage() {
    if (currentPage === 1) return;
    searchParams.set('page', currentPage - 1);
    setSearchParams(searchParams);
  }

  if (count <= PAGE_SIZE) return;

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{' '}
        <span>{`${
          PAGE_SIZE * currentPage > count ? count : PAGE_SIZE * currentPage
        }`}</span>{' '}
        of <span>{count}</span> results
      </P>
      <Buttons>
        {currentPage !== 1 && (
          <PaginationButton onClick={toPrevPage}>
            <HiChevronLeft />
            <span>Previous</span>
          </PaginationButton>
        )}
        {currentPage !== pageCount && (
          <PaginationButton onClick={toNextPage}>
            <span>Next</span>
            <HiChevronRight />
          </PaginationButton>
        )}
      </Buttons>
    </StyledPagination>
  );
}
