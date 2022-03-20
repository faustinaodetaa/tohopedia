import React from 'react';
import styles from '../styles/pagination.module.scss';



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
      <div className={styles.buttonContainer}>
        {page !== 1 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button" className={styles.buttons}
          >
            &lt;
          </button>
        )}        <button
          onClick={() => handlePagination(1)}
          type="button" className={styles.buttons}

        >
          {1}
        </button>        {page > 3 && <div>...</div>}        {page === totalPages && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page - 2)}
            type="button" className={styles.buttons}
          >
            {page - 2}
          </button>
        )}        {page > 2 && (
          <button
            onClick={() => handlePagination(page - 1)}
            type="button" className={styles.buttons}
          >
            {page - 1}
          </button>
        )}        {page !== 1 && page !== totalPages && (
          <button
            onClick={() => handlePagination(page)}
            type="button" className={styles.buttons}
          >
            {page}
          </button>
        )}        {page < totalPages - 1 && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button" className={styles.buttons}
          >
            {page + 1}
          </button>
        )}        {page === 1 && totalPages > 3 && (
          <button
            onClick={() => handlePagination(page + 2)}
            type="button" className={styles.buttons}
          >
            {page + 2}
          </button>
        )}        {page < totalPages - 2 && <div>...</div>}        <button
          onClick={() => handlePagination(totalPages)}
          type="button" className={styles.buttons}
        
        >
          {totalPages}
        </button>        {page !== totalPages && (
          <button
            onClick={() => handlePagination(page + 1)}
            type="button" className={styles.buttons}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export const Pagination = PaginationComponent;