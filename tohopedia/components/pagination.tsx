import React from 'react';


export interface Props {
  count: number;  //total number of content
  page: number; //current page
  totalPages: number;
  totalContent: number; //total content should be displayed
  handlePagination: (page: number) => void;
}

export const PaginationComponent: React.FC<Props> = ({
  count,
  page,
  totalPages,
  totalContent,
  handlePagination,
}) => {
  return (
    <div>
      <div>
        {page !== 1 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
          >
            &lt;
          </button>
        )}        <button
          onClick={() => handlePagination(1)}
          type="button"

        >
          {1}
        </button>        {page > 3 && <div>...</div>}        {page === totalPages && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type="button"
          >
            {page - 2}
          </button>
        )}        {page > 2 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button"
          >
            {page - 1}
          </button>
        )}        {page !== 1 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type="button"
          >
            {page}
          </button>
        )}        {page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
          >
            {page + 1}
          </button>
        )}        {page === 1 && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page + 2)}
            type="button"
          >
            {page + 2}
          </button>
        )}        {page < totalPages - 2 && <div>...</div>}        <button
          onClick={() => handlePagination(totalPages)}
          type="button"
        
        >
          {totalPages}
        </button>        {page !== totalPages && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export const Pagination = PaginationComponent;