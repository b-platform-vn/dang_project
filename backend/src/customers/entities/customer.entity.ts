import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  DeleteDateColumn 
} from 'typeorm';

@Entity('customers') // Tên bảng trong Database
export class Customer {
  // ID tự động tăng
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'nvarchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 20, unique: true })
  phoneNumber: string;

  @Column({ type: 'nvarchar', length: 500, nullable: true })
  address: string;

  @Column({ type: 'nvarchar', length: 50, nullable: true })
  joinDate: string; 

  @Column({ type: 'nvarchar', length: 50, default: 'Vãng lai' })
  tier: string;

  @Column({ type: 'nvarchar', length: 50, default: 'Active' })
  status: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  createdBy: string;

  @Column({ type: 'nvarchar', length: 255, nullable: true })
  updatedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date; 
}