import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './Student';

@Entity('affiliation', { schema: 'attendance' })
export class Affiliation {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: '국가 id' })
  id: number;

  @Column('varchar', { name: 'name', comment: '소속명', length: 32 })
  name: string;

  @Column('datetime', {
    name: 'created_at',
    comment: '생성일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updated_at',
    comment: '수정일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Student, (student) => student.affiliation)
  students: Student[];
}
