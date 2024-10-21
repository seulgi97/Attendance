import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Student } from './Student';

export enum Week {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}

@Entity('schedule', { schema: 'attendance' })
export class Schedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'student_id', nullable: true, comment: '학생 id' })
  studentId: number | null;

  @Column('enum', { name: 'week', enum: Week, comment: '요일' })
  week: Week;

  @Column('int', { name: 'start_time', comment: '수업시작 시간' })
  startTime: number;

  @Column('int', { name: 'end_time', comment: '수업끝 시간' })
  endTime: number;

  @ManyToOne(() => Student, (student) => student.schedules)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;
}