const PaginationButton = ({currentPage, setCurrentPage, totalPages}) => {
    return (
        <div className="pagination mt-8 flex justify-center align-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-purple-300 text-black cursor-pointer rounded w-[100px] hover:bg-purple-200 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="mx-4 px-4 py-2 text-white text-center">
              {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-purple-300 text-black cursor-pointer rounded w-[100px] hover:bg-purple-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
    )
}

export default PaginationButton