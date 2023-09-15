import * as React from 'react';

export type PaginationParams = {
  initialPage?: number;
  total: number;
  boundaries?: number;
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({ total, boundaries = 1, initialPage = 1 }: PaginationParams) => {
  const [currentPage, setPage] = React.useState(initialPage);

  const first = () => setPage(1);
  const last = () => setPage(total);
  const next = () => setPage((curr) => (curr < total ? curr + 1 : total));
  const previous = () => setPage((curr) => (curr <= 1 ? 1 : curr - 1));

  const paginate = () => {
    const shouldShowLeftDots = currentPage > boundaries + 1;
    const shouldShowRightDots = currentPage < total - (boundaries + 1);

    if (shouldShowLeftDots && !shouldShowRightDots) {
      return [...range(1, 1), '...', ...range(total - boundaries - 1, total)];
    }
    if (shouldShowRightDots && !shouldShowLeftDots) {
      return [...range(1, boundaries + 2), '...', ...range(total - boundaries + 1, total)];
    }

    const leftSlice = currentPage - boundaries;
    const rightSlice = currentPage + boundaries;

    return [
      ...range(1, boundaries),
      '...',
      ...range(leftSlice, rightSlice),
      '...',
      ...range(total - boundaries + 1, total),
    ];
  };

  return {
    first,
    last,
    next,
    previous,
    setPage,
    paginate,
    active: currentPage,
  };
};
