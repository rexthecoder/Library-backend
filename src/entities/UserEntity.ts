import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import { tokenHelper } from '../helper';
import { compare, hash } from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  LIBRARIAN = 'librarian',
  EDITOR = 'editor',
}

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  userId: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({default: UserRole.EDITOR})
  role: string;

  @Column({ nullable: true })
  isGeneratedPassword: boolean;

  @Column({ nullable: true })
  level: string;

  @CreateDateColumn()
  createdAt: Date;

  @BeforeInsert()
  async hashPassword() {
    console.log("hashpassowrd", this.password)
    if (this.password) {
      this.password = await hash(this.password, 10);
    }
  }
  


  generateToken(expiresIn = '1h') {
    const data = { id: this.userId, email: this.email };
    return tokenHelper.generateToken(data, expiresIn);
  }

  validatePassword(plainPassword: any) {
    console.log(plainPassword)
    console.log(this.password)
    return compare(plainPassword, this.password);
  }
}