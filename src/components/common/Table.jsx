import React, { useState } from "react";
import { FiEdit, FiTrash, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdEye } from "react-icons/io";

const Table = ({ title, columns, data = [], onEdit, onDelete, onView, showRoleUpdate, rowClass }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Ensure `data` is always an array
  if (!Array.isArray(data)) {
    console.error("Invalid data format:", data);
    return <p>Error: Table data is not an array.</p>;
  }

  // Filter data based on search input
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      typeof value === "string" && value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Search Bar */}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
        <div className="overflow-x-auto">
          <div className={`${columns.length < 8 ? "w-full" : "w-96"}`}>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  {columns.map((column) => (
                    <th key={column.key} className="border p-3">
                      {column.label}
                    </th>
                  ))}
                  <th className="border p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((row, index) => {
                    const idKey = Object.keys(row).find((key) => key.toLowerCase().includes("id"));
                    const rowId = idKey ? row[idKey] : null;

                    return (
                      <tr key={index} className={`border p-2 ${rowClass ? rowClass(row) : ""}`}>
                        {columns.map((column) => (
                          <td key={column.key} className="border p-3">
                            {column.render ? column.render(row) : row[column.key]}
                          </td>
                        ))}
                        <td className="p-3 flex gap-3 justify-center">
                          <button onClick={() => onView(row)} className="text-green-900 hover:text-green-700 cursor-pointer">
                            <IoMdEye size={18} />
                          </button>
                          <button onClick={() => onEdit(row)} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => rowId && onDelete(row)}
                            className={`text-red-500 hover:text-red-700 cursor-pointer ${!rowId ? "opacity-50 cursor-not-allowed" : ""}`}
                            disabled={!rowId}
                          >
                            <FiTrash size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length + 1} className="text-center p-4 text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 bg-gray-200 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 cursor-pointer"
              }`}
          >
            <FiChevronLeft /> Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 bg-gray-200 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-300 cursor-pointer"
              }`}
          >
            Next <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;