import React, { useState, useEffect } from "react";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  FileText,
  Edit,
  Trash,
  ChevronDown,
  Square,
  Circle,
} from "lucide-react";
import * as XLSX from "xlsx";
import DataTable from "../../../components/tables/dataTable";
import useGetDelayed from "../../../hooks/useGetDelayed";

const AllCompanies = () => {
  const [getCompaniesState, companies, fetchCompanies] =
    useGetDelayed("su/companies");
  // Sample data
  const [data, setData] = useState([
    {
      id: 1,
      companyName: "XYZ Company",
      primaryAdmin: "ABCD XYZ",
      adminEmail: "ABCD@gmail.com",
      noOfSubscribers: 1000,
      videoPerSubscribers: 5,
      planExpiryDate: "1 Month",
    },
    // Add more dummy data as needed
  ]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const cols = [
    {
      title: "Company Name",
      dataIndex: "companyName",
    },
    {
      title: "Primary Admin Name",
      dataIndex: "primaryAdminName",
    },
    {
      title: "Primary Admin Email",
      dataIndex: "primaryAdminEmail",
    },
    {
      title: "No. Of subs/tokens",
      dataIndex: "subscribersCount",
    },
    {
      title: "No. Videos",
      dataIndex: "videosPerSubscriber",
    },
    {
      title: "Plan Type",
      dataIndex: "plan",
    },
    {
      title:"Actions",
      dataIndex:"id",
      render:(id, row)=>{
        return <div className="bg-red-400 flex grid-cols-3 gap-2">
          <button onClick={()=>alert("edit")}>Edit</button>
          <button onClick={()=>alert("Delete")}>Delete</button>
          <button onClick={()=>alert("View")}>View</button>
        </div>
      }
    }
  ];

  // Initialize filtered data
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Handle search
  useEffect(() => {
    const results = data.filter((item) =>
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
    setCurrentPage(1);
  }, [searchTerm, data]);

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle sort
  const handleSort = (field) => {
    const direction =
      field === sortField && sortDirection === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...filteredData].sort((a, b) => {
      if (direction === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setFilteredData(sorted);
  };

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle pages
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust if we're at the start or end
      if (currentPage <= 2) {
        end = 4;
      } else if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed before middle pages
      if (start > 2) {
        pages.push("...");
      }

      // Add middle pages
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed after middle pages
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Companies");
    XLSX.writeFile(workbook, "Companies.xlsx");
  };

  // Custom Edit icon with Square (matches your image)
  const EditIcon = () => (
    <div className="relative inline-block">
      <Square size={16} className="text-blue-600" />
      <Edit
        size={10}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-600"
      />
    </div>
  );

  // Custom Delete icon (trash can)
  const DeleteIcon = () => <Trash size={16} className="text-red-600" />;

  // Custom View Details icon (arrow in circle)
  const ViewDetailsIcon = () => (
    <div className="relative inline-block">
      <Circle size={16} className="text-gray-600" />
      <ArrowRight
        size={10}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-600"
      />
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-7xl mx-auto">
      {/* Search bar */}
      <div className="relative flex-grow sm:flex-grow-0">
        <input
          type="text"
          placeholder="Search company name..."
          className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
          Companies
        </h2>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
          {/* Export Excel button */}
          <button
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md flex items-center justify-center hover:bg-gray-50"
            onClick={exportToExcel}
          >
            <FileText size={16} className="mr-2" />
            <span>EXPORT EXCEL</span>
          </button>
        </div>
      </div>
      <DataTable sourceData={companies?.data ?? []} columnStructure={cols} />
    </div>
  );
};

export default AllCompanies;
