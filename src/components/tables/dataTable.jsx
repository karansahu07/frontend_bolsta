import React from "react";
import PropTypes from 'prop-types';
import { ChevronDown, ArrowLeft, ArrowRight } from "lucide-react";

const DataTable = ({
  columnStructure = [],
  sourceData = [],
  currentPage = 1,
  onPageChange=(page)=>P,
  onRowsPerPageChange=(rowsPerPage)=>{},
  rowsPerPage = 10,
  totalDocs = 0,
  totalPages = 1,
  loading = false,
}) => {
  return (
    <div className="bg-white max-w-7xl mx-auto">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white">
              {columnStructure.map(({ title, dataIndex, sort }) => (
                <th
                  key={dataIndex}
                  className="px-4 py-3 text-left text-sm font-medium cursor-pointer"
                  onClick={() => sort && sort(dataIndex)}
                >
                  <div className="flex items-center">
                    {title}
                    {sort && <ChevronDown size={16} className="ml-1" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columnStructure.length || 1} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : sourceData.length > 0 ? (
              sourceData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  {columnStructure.map(({ dataIndex, render }) => (
                    <td key={dataIndex} className="px-4 py-4 text-sm text-gray-700">
                      {render ? render(row[dataIndex], row) : row[dataIndex] || "-"}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnStructure.length || 1} className="text-center py-4">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ArrowLeft size={16} className="mr-2" />
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

DataTable.propTypes = {
    columnStructure: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        dataIndex: PropTypes.string.isRequired,
        render: PropTypes.func,
      })
    ).isRequired,
    sourceData: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    totalDocs: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    pagination: PropTypes.bool,
  };

export default DataTable;
