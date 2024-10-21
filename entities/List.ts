import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from './Student';
import { ListForm } from './ListForm';

@Entity('list', { schema: 'attendance' })
export class List {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'student_id', nullable: true, comment: '학생 id' })
  studentId: number | null;

  @Column('int', { name: 'list_form_id', nullable: true, comment: 'list_form id' })
  listFormId: number | null;

  @Column('varchar', { name: 'content', length: 128, comment: 'list 대답' })
  content: string;

  @ManyToOne(() => Student, (student) => student.lists)
  @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
  student: Student;

  @ManyToOne(() => ListForm, (listForm) => listForm.lists)
  @JoinColumn([{ name: 'list_form_id', referencedColumnName: 'id' }])
  listForm: ListForm;
}