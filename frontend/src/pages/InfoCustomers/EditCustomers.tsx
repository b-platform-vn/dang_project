import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { customerFormSchema, CustomerFormValues } from "@/validation/customer.schema"
import { customerService } from "@/services/customer.service"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

export default function EditCustomers() {
  const navigate = useNavigate()
  const { id } = useParams()

  const {
    register, handleSubmit, control, reset,
    formState: { errors }
  } = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      fullName: "", phoneNumber: "", address: "", joinDate: "", tier: ""
    }
  })

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customers = await customerService.getAllCustomers({});
        const customer = customers.data.find((c: any) => c.id === Number(id));
        if (customer) {
          reset({
            fullName: customer.fullName,
            phoneNumber: customer.phoneNumber,
            address: customer.address,
            joinDate: customer.joinDate,
            tier: customer.tier,
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin khách hàng:", error);
      }
    };
    fetchCustomer();
  }, [id, reset]);

  const onSubmit = async (data: CustomerFormValues) => {
    try {
      await customerService.updateCustomer(id!, data);
      alert("Cập nhật thành công!");
      navigate("/customerslist");
    } catch (error) {
      alert("Cập nhật thất bại!");
    }
  }

  return (
    <div>
      <h2 className="text-[30px] font-bold text-gray-800 mb-6">Cập nhật khách hàng</h2>
      <div className="bg-white rounded-xl shadow-sm p-8 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 max-w-2xl mx-auto">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Họ Tên</label>
            <Input {...register("fullName")} className={`h-12 bg-gray-100 text-base ${errors.fullName ? "border-red-500" : "border-gray-200"}`} />
            {errors.fullName && <span className="text-sm text-red-500">{errors.fullName.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
            <Input {...register("phoneNumber")} className={`h-12 bg-gray-100 text-base ${errors.phoneNumber ? "border-red-500" : "border-gray-200"}`} />
            {errors.phoneNumber && <span className="text-sm text-red-500">{errors.phoneNumber.message}</span>}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
            <Input {...register("address")} className={`h-12 bg-gray-100 text-base ${errors.address ? "border-red-500" : "border-gray-200"}`} />
            {errors.address && <span className="text-sm text-red-500">{errors.address.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Ngày tham gia</label>
            <Input {...register("joinDate")} className={`h-12 bg-gray-100 text-base ${errors.joinDate ? "border-red-500" : "border-gray-200"}`} />
            {errors.joinDate && <span className="text-sm text-red-500">{errors.joinDate.message}</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Phân hạng</label>
            <Controller
              control={control} name="tier"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className={`min-h-[48px] w-52 bg-gray-100 text-base shadow-none ${errors.tier ? "border-red-500" : "border-gray-200 text-gray-500"}`}>
                    <SelectValue placeholder="Chọn phân hạng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vãng lai">Vãng lai</SelectItem>
                    <SelectItem value="Thân thiết">Thân thiết</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.tier && <span className="text-sm text-red-500">{errors.tier.message}</span>}
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <Button type="submit" className="h-12 bg-[#DF383D] hover:bg-[#c93237] text-white text-base font-semibold rounded-lg w-full">
              Cập nhật
            </Button>
            <Button type="button" variant="secondary" className="h-12 bg-gray-100 hover:bg-gray-200 text-[#DF383D] text-base font-semibold rounded-lg w-full"
              onClick={() => navigate("/customerslist")}>
              Hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}