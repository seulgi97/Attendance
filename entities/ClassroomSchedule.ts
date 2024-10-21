import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Classroom } from './Classroom';
import { Teacher } from './Teacher';
import { Student } from './Student';

@Entity('classroom_schedule', { schema: 'attendance' })
export class ClassroomSchedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'classroom_id', comment: '강의실 id' })
  classroomId: number;

  @Column('int', { name: 'teacher_id', comment: '선생님 id' })
  teacherId: number;

  @Column('int', { name: 'student_id', nullable: true, comment: '학생 id' })
  studentId: number | null;

  @ManyToOne(() => Classroom, (classroom) => classroom.classroomSchedules)
  @JoinColumn([{ name: 'classroom_id', referencedColumnName: 'id' }])
  classroom: Classroom;

  @ManyToOne(() => Teacher, (teacher) => teacher.classroomSchedules)
  @JoinColumn([{ name: 'teacher_id', referencedColumnName: 'id' }])
  teacher: Teacher;

  @ManyToOne(() => Student, (student) => student.classroomSchedules)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;
}