export default function Pagination({
  page,
  totalPages,
  setPage,
}) {
  return (
    <div className="flex gap-2 mt-5">
      <button
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
        className="bg-gray-300 px-3 py-1 rounded"
      >
        Prev
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() =>
          setPage(page + 1)
        }
        className="bg-gray-300 px-3 py-1 rounded"
      >
        Next
      </button>
    </div>
  );
}