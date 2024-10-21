import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ClassroomSchedule } from './ClassroomSchedule';

@Entity('classroom', { schema: 'attendance' })
export class Classroom {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 32, comment: '강의실 이름' })
  name: string;

  @OneToMany(() => ClassroomSchedule, (classroomSchedule) => classroomSchedule.classroom)
  classroomSchedules: ClassroomSchedule[];
}