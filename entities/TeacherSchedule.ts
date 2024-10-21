import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from './Teacher';
import { Week } from './Schedule';

@Entity('teacher_schedule', { schema: 'attendance' })
export class TeacherSchedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'teacher_id', comment: '선생님 id' })
  teacherId: number;

  @Column('enum', { name: 'week', enum: Week, comment: '요일' })
  week: Week;

  @Column('int', { name: 'start_time', comment: '수업시작 시간' })
  startTime: number;

  @Column('int', { name: 'end_time', comment: '수업끝 시간' })
  endTime: number;

  @ManyToOne(() => Teacher, (teacher) => teacher.teacherSchedules)
  @JoinColumn([{ name: 'teacher_id', referencedColumnName: 'id' }])
  teacher: Teacher;
}