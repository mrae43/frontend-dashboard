import { useState } from "react";
import Select from "react-select";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { customStyles } from "../utils/style";
import { useSearchParams } from "react-router-dom";

export const Pagination = ({ totalItems }: { totalItems: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  
  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.max(1, Math.ceil(totalItems / limit));

  const [jumpPage, setJumpPage] = useState("");

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newOffset = (page - 1) * limit;
    searchParams.set("offset", newOffset.toString());
    setSearchParams(searchParams);
  };

  const handleLimitChange = (newLimit: number) => {
    searchParams.set("limit", newLimit.toString());
    searchParams.set("offset", "0"); // Reset to first page
    setSearchParams(searchParams);
  };

  const handleJumpSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const page = parseInt(jumpPage, 10);
    if (!isNaN(page)) {
      handlePageChange(page);
    }
    setJumpPage("");
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - maxVisiblePages + 1;
      }

      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) pages.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const from = totalItems === 0 ? 0 : offset + 1;
  const to = Math.min(offset + limit, totalItems);

  if (totalItems === 0) return null;

  return (
    <div className="sticky bottom-0 bg-white border border-slate-200 shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between">
      <div className="flex items-center gap-2">
        <p className="text-md text-slate-900 font-semibold">Show per page:</p>
        <Select
          options={[
            { value: "30", label: "30" },
            { value: "20", label: "20" },
            { value: "10", label: "10" },
          ]}
          styles={customStyles}
          menuPlacement="top"
          isSearchable={false}
          value={{ value: limit.toString(), label: limit.toString() }}
          onChange={(val) => val && handleLimitChange(parseInt(val.value, 10))}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="text-md text-slate-900 font-semibold">
          Showing <span className="font-medium text-slate-900">{from}</span> to{" "}
          <span className="font-medium text-slate-900">{to}</span> of{" "}
          <span className="font-medium text-slate-900">{totalItems}</span> members
        </p>
      </div>
      <div className="flex items-center flex-wrap gap-2 justify-center sm:justify-start">
        <div className="flex items-center gap-1 mr-2 hidden sm:flex">
          <form onSubmit={handleJumpSubmit} className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Go to</span>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPage}
              onChange={(e) => setJumpPage(e.target.value)}
              className="w-16 px-2 py-1 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={currentPage.toString()}
            />
          </form>
        </div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {getPageNumbers().map((page, index) => (
          typeof page === 'number' ? (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1.5 border shadow-sm rounded-lg text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 text-slate-900 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2 text-slate-500">
              <MoreHorizontal className="w-4 h-4" />
            </span>
          )
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};