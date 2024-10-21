import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Student } from './Student';
  import { CheckList } from './CheckList';
  import { CheckForm } from './CheckForm';
  
  @Entity('check', { schema: 'attendance' })
  export class Check {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;
  
    @Column('int', { name: 'student_id', nullable: true, comment: '학생 id' })
    studentId: number | null;
  
    @Column('int', { name: 'check_list_id', nullable: true, comment: 'check_list id' })
    checkListId: number | null;
  
    @Column('int', { name: 'check_form_id', nullable: true, comment: 'check_form id' })
    checkFormId: number | null;
  
    @ManyToOne(() => Student, (student) => student.checks)
    @JoinColumn([{ name: 'student_id', referencedColumnName: 'id' }])
    student: Student;
  
    @ManyToOne(() => CheckList, (checkList) => checkList.checks)
    @JoinColumn([{ name: 'check_list_id', referencedColumnName: 'id' }])
    checkList: CheckList;
  
    @ManyToOne(() => CheckForm, (checkForm) => checkForm.checks)
    @JoinColumn([{ name: 'check_form_id', referencedColumnName: 'id' }])
    checkForm: CheckForm;
  }