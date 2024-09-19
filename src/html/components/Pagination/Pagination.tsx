import './Pagination.scss'
import { FaArrowLeftLong } from "react-icons/fa6"
import { FaArrowRightLong } from "react-icons/fa6"

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const pagesToShow = 5 
    const halfPagesToShow = Math.floor(pagesToShow / 2)

    let startPage = Math.max(1, currentPage - halfPagesToShow)
    let endPage = Math.min(totalPages, currentPage + halfPagesToShow)

    if (endPage - startPage + 1 < pagesToShow) {
        if (startPage === 1) {
            endPage = Math.min(totalPages, endPage + (pagesToShow - (endPage - startPage + 1)))
        } else if (endPage === totalPages) {
            startPage = Math.max(1, startPage - (pagesToShow - (endPage - startPage + 1)))
        }
    }

    return (
        <div className="pagination">
            <button
                className='pagination-button pagination-prev'
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <FaArrowLeftLong />
            </button>
            {startPage > 1 && (
                <>
                    <button
                        className='pagination-button'
                        onClick={() => onPageChange(1)}
                    >
                        1
                    </button>
                    {startPage > 2 && <span className='pagination-dots'>...</span>}
                </>
            )}
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(page => (
                <button
                    key={page}
                    className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className='pagination-dots'>...</span>}
                    <button
                        className='pagination-button'
                        onClick={() => onPageChange(totalPages)}
                    >
                        {totalPages}
                    </button>
                </>
            )}
            <button
                className='pagination-button pagination-next'
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
               <FaArrowRightLong />
            </button>
        </div>
    )
}

export default Pagination
