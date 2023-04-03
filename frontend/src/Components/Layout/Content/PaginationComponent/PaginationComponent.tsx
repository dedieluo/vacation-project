import "./PaginationComponent.css";
import Pagination from 'react-bootstrap/Pagination';

interface PaginationProps {
    page: number;
    perPage: number;
    totalPage: number;
    onPageChange: (page: number) => void;
}

function PaginationComponent({ page, perPage, totalPage, onPageChange }: PaginationProps): JSX.Element {
    const items = [];

    // Show page numbers from 1 to `totalPage`
    for (let i = 1; i <= totalPage; i++) {
        items.push(
            <Pagination.Item
                key={i}
                active={i === page}
                onClick={() => onPageChange(i)}
            >
                {i}
            </Pagination.Item>
        );
    }

    return (
        <div className="PaginationComponent">
            <Pagination>
                <Pagination.Prev
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                />
                {items}
                <Pagination.Next
                    disabled={page >= totalPage}
                    onClick={() => onPageChange(page + 1)}
                />
            </Pagination>
            <p>
                Showing {perPage} items per page, page {page} of {totalPage}
            </p>
        </div>
    );
}

export default PaginationComponent;