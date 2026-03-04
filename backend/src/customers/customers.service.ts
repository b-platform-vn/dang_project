import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) { }

  async create(createCustomerDto: CreateCustomerDto) {
  try {
    const newCustomer = this.customersRepository.create({
      ...createCustomerDto,
      status: 'Active',
      createdBy: 'admin',
      updatedBy: 'admin',
    });
    return await this.customersRepository.save(newCustomer);
  } catch (error: any) {
    if (error.number === 2627) {
      throw new ConflictException('Số điện thoại này đã tồn tại trong hệ thống!');
    }
    throw new InternalServerErrorException('Lỗi server khi tạo khách hàng');
  }
}

async update(id: number, updateCustomerDto: any) {
  const customer = await this.customersRepository.findOne({ where: { id } });
  if (!customer) throw new Error('Không tìm thấy khách hàng');
  
  Object.assign(customer, {
    ...updateCustomerDto,
    updatedBy: 'admin',
  });
  return await this.customersRepository.save(customer);
}

async remove(id: number) {
  const customer = await this.customersRepository.findOne({ where: { id } });
  if (!customer) throw new Error('Không tìm thấy khách hàng');
  
  customer.status = 'Deleted';
  customer.updatedBy = 'admin';
  customer.deletedAt = new Date();
  return await this.customersRepository.save(customer);
}

  async findAll(query: any) {
  const page = parseInt(query.page) || 1;
  const limit = 6;
  const skip = (page - 1) * limit;

  const qb = this.customersRepository.createQueryBuilder('customer');

  if (query.search) {
    qb.where(
      'customer.fullName LIKE :search OR customer.phoneNumber LIKE :search OR customer.address LIKE :search',
      { search: `%${query.search}%` }
    );
  }

  if (query.tier) 
    qb.andWhere('customer.tier = :tier', 
    { tier: query.tier });
  if (query.status) 
    qb.andWhere('customer.status = :status', 
    { status: query.status });
  if (query.dateSort === 'newest') 
    qb.orderBy('customer.createdAt', 'DESC');
  else if (query.dateSort === 'oldest') 
    qb.orderBy('customer.createdAt', 'ASC');
  else 
    qb.orderBy('customer.createdAt', 'DESC');

  qb.skip(skip).take(limit);

  const [data, total] = await qb.getManyAndCount();
  
  return {
    data,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
}
}