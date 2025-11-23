import ButtonLayout from "./ButtonLayout";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  page,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <ButtonLayout
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
      >
        Prev
      </ButtonLayout>

      <span className="text-sm">
        Page {page} of {totalPages}
      </span>

      <ButtonLayout
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 bg-gray-200 rounded disabled:opacity-40"
      >
        Next
      </ButtonLayout>
    </div>
  );
}
