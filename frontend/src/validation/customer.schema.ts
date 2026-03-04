import * as z from "zod"

export const customerFormSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ tên khách hàng."),
  phoneNumber: z
    .string()
    .min(1, "Vui lòng nhập số điện thoại.")
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, "Số điện thoại không hợp lệ (VD: 0912345678)."),
  address: z.string().min(1, "Vui lòng nhập địa chỉ."),
  joinDate: z.string().min(1, "Vui lòng nhập ngày tham gia (DD/MM/YYYY)."),
  tier: z.string().min(1, "Vui lòng chọn phân hạng."),
})

export type CustomerFormValues = z.infer<typeof customerFormSchema>