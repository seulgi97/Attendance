import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { TeacherSchedule } from './TeacherSchedule';
import { ClassroomSchedule } from './ClassroomSchedule';

@Entity('teacher', { schema: 'attendance' })
@Index('name', ['name'], { unique: true })
export class Teacher {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 32, comment: '이름' })
  name: string;

  @OneToMany(() => TeacherSchedule, (teacherSchedule) => teacherSchedule.teacher)
  teacherSchedules: TeacherSchedule[];

  @OneToMany(() => ClassroomSchedule, (classroomSchedule) => classroomSchedule.teacher)
  classroomSchedules: ClassroomSchedule[];
}