import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  fullName: string;

  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })

  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, { message: 'Số điện thoại không hợp lệ' })
  phoneNumber: string;

  @IsString()
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'Ngày tham gia không được để trống' })
  joinDate: string;

  @IsString()
  @IsNotEmpty({ message: 'Phân hạng không được để trống' })
  tier: string;
}