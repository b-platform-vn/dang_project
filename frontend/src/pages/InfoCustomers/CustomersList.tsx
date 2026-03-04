import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Filter, RotateCcw, ChevronLeft, ChevronRight, Plus, Search, Pencil, Trash2 } from "lucide-react"
import { useCustomers } from "@/hooks/useCustomers" 
import { useNavigate } from "react-router-dom"
import { customerService } from "@/services/customer.service"
const getStatusBadge = (status: string) => {
  switch (status) {
    case "Active":
      return <Badge className="w-28 py-2 !rounded-md justify-center bg-emerald-200 text-emerald-600 hover:bg-emerald-100 border-none font-bold">Active</Badge>
    case "Processing":
      return <Badge className="w-28 py-2 !rounded-md justify-center bg-purple-200 text-purple-600 hover:bg-purple-100 border-none font-bold">Processing</Badge>
    case "Deleted":
      return <Badge className="w-28 py-2 !rounded-md justify-center bg-red-200 text-red-600 hover:bg-red-100 border-none font-bold">Deleted</Badge>
    default:
      return <Badge className="w-28 py-2 !rounded-md justify-center" variant="outline">{status}</Badge>
  }
}


export default function CustomersList() {
  const { 
    customers, loading, error, 
    dateSort, setDateSort,
    tier, setTier,
    status, setStatus,
    clearFilters ,
    page, setPage, totalPages,
    search, setSearch,
    refetch
  } = useCustomers();
  const navigate = useNavigate()
  const handleDelete = async (id: string) => {
  if (!window.confirm('Bạn có chắc muốn xóa khách hàng này?')) return;
  try {
    await customerService.deleteCustomer(id);
    refetch();
  } catch (error) {
    alert('Xóa thất bại!');
  }
}
  return (
  <div>
    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-[30px] font-bold text-gray-800">Thông tin Khách hàng</h2>
      <Button 
        onClick={() => navigate("/customerslist/add")}
        className="h-10 bg-[#DF383D] hover:bg-[#c93237] text-white font-semibold rounded-lg flex gap-2"
      >
        <Plus className="w-4 h-4" />
        Thêm khách hàng
      </Button>
    </div>

    {/* Search */}
    <div className="relative mb-4">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Tìm kiếm theo tên, SĐT, địa chỉ..."
        value={search}
        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-300"
      />
    </div>

    {/* Filter bar */}
    <div className="flex flex-wrap items-stretch gap-0 mb-6 border border-gray-300 rounded-lg bg-gray-50/50 w-max">
      <div className="flex items-center justify-center py-3 px-5">
        <Filter className="w-5 h-5 text-black font-extrabold" />
      </div>
      <div className="w-px self-stretch bg-gray-300"></div>

      <div className="flex items-center py-3 px-5">
        <span className="text-sm font-medium text-black">Lọc theo</span>
      </div>
      <div className="w-px self-stretch bg-gray-300"></div>

      <div className="py-3 px-5">
        <Select value={dateSort} onValueChange={setDateSort}>
          <SelectTrigger className="w-[150px] h-8 bg-transparent border-none shadow-none focus:ring-0 !text-black font-medium">
            <SelectValue placeholder="Ngày tham gia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Mới nhất</SelectItem>
            <SelectItem value="oldest">Cũ nhất</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-px self-stretch bg-gray-300"></div>

      <div className="py-3 px-5">
        <Select value={tier} onValueChange={setTier}>
          <SelectTrigger className="w-[140px] h-8 bg-transparent border-none shadow-none focus:ring-0 !text-black font-medium">
            <SelectValue placeholder="Phân hạng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Vãng Lai">Vãng Lai</SelectItem>
            <SelectItem value="Thân thiết">Thân thiết</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-px self-stretch bg-gray-300"></div>

      <div className="py-3 px-5">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-[140px] h-8 bg-transparent border-none shadow-none focus:ring-0 !text-black font-medium">
            <SelectValue placeholder="Tình trạng" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Processing">Processing</SelectItem>
            <SelectItem value="Deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-px self-stretch bg-gray-300"></div>

      <div className="py-3 px-5">
        <Button 
          onClick={clearFilters} 
          variant="ghost" 
          className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50 px-3 flex gap-2 font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Xóa bộ lọc
        </Button>
      </div>
    </div>

    {/* Table */}
    <div className="border border-gray-300 rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50 hover:bg-gray-50/50">
            <TableHead className="w-[8%] pl-6 font-semibold text-gray-900 py-4">ID</TableHead>
            <TableHead className="w-[20%] font-semibold text-gray-900">Họ Tên</TableHead>
            <TableHead className="w-[15%] font-semibold text-gray-900">Số điện thoại</TableHead>
            <TableHead className="font-semibold w-[30%] text-gray-900">Địa chỉ</TableHead>
            <TableHead className="w-[15%] font-semibold text-gray-900">Ngày tham gia</TableHead>
            <TableHead className="w-[12%] font-semibold text-gray-900">Phân hạng</TableHead>
            <TableHead className="w-[15%] font-semibold text-gray-900 text-right pr-18">Tình trạng</TableHead>
            <TableHead className="w-[10%] font-semibold text-gray-900 text-center">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading && error && (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-red-500 font-medium">
                {error}
              </TableCell>
            </TableRow>
          )}

          {!loading && !error && customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="h-32 text-center text-gray-500">
                Chưa có khách hàng nào.
              </TableCell>
            </TableRow>
          )}

          {!loading && !error && customers.map((customer) => (
            <TableRow key={customer.id} className="hover:bg-gray-50/50">
              <TableCell className="text-gray-800 py-4 pl-6">{customer.id}</TableCell>
              <TableCell className="text-gray-800">{customer.fullName}</TableCell>
              <TableCell className="text-gray-800">{customer.phoneNumber}</TableCell>
              <TableCell className="text-gray-800">{customer.address}</TableCell>
              <TableCell className="text-gray-800">{customer.joinDate}</TableCell>
              <TableCell className="text-gray-800">{customer.tier}</TableCell>
              <TableCell className="text-right pr-6">
                {getStatusBadge(customer.status)}
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost" size="sm"
                  onClick={() => navigate(`/customerslist/edit/${customer.id}`)}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost" size="sm"
                  onClick={() => handleDelete(customer.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    {/* Pagination */}
    <div className="flex items-center justify-between mt-6">
      <Button 
        variant="outline" size="sm"
        className="text-gray-900 flex gap-1 font-medium border-gray-300"
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        Trang trước
      </Button>

      <span className="text-sm text-gray-500">Trang {page} / {totalPages}</span>

      <Button 
        variant="outline" size="sm"
        className="text-gray-900 flex gap-1 font-medium border-gray-300"
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
      >
        Trang sau
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  </div>
)
}