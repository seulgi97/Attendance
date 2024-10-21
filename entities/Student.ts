import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Affiliation } from './Affiliation';
import { List } from './List';
import { Check } from './Check';
import { Schedule } from './Schedule';
import { ClassroomSchedule } from './ClassroomSchedule';

export enum Major {
  Justice = 'Justice',
  Definition = 'definition',
  ArtsPhysical = 'ArtsPhysical',
  Undecided = 'Undecided'
}

export enum Optional {
  Probability = 'Probability',
  Geometry = 'Geometry',
  DifferentiationIntegration = 'DifferentiationIntegration',
  Unexist = 'Unexist'
}


@Index('name', ['name'], { unique: true })
@Index('phone', ['phone'], { unique: true })
@Index('affiliation_id', ['affiliationId'], {})
@Entity('student', { schema: 'attendance' })
export class Student {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', {
    name: 'affiliation_id',
    nullable: true,
    comment: '소속 id',
    default: () => "'1'",
  })
  affiliationId: number;

  @Column('varchar', { name: 'name', comment: '이름', length: 32 })
  name: string;

  @Column('varchar', {
    name: 'phone',
    nullable: true,
    unique: true,
    comment: '휴대폰번호',
    length: 64,
  })
  phone: string;

  @Column('varchar', {
    name: 'school',
    nullable: true,
    comment: '학교이름',
    length: 20,
  })
  school: string;

  @Column('varchar', {
    name: 'grade',
    nullable: true,
    comment: '학년',
    length: 10,
  })
  grade: string;

  @Column('enum', {
    name: 'major',
    enum: Major,
    comment: '전공',
  })
  major: Major;

  @Column('enum', {
    name: 'optional',
    enum: Optional,
    comment: '선택과목',
  })
  optional: Optional;
  
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

  @Column('datetime', {
    name: 'admitted_at',
    comment: '입학 일시',
    default: () => 'CURRENT_TIMESTAMP',
  })
  admittedAt: Date;

  @Column('datetime', {
    name: 'deleted_at',
    nullable: true,
    comment: '탈퇴신청일시',
  })
  deletedAt: Date | null;

  @ManyToOne(() => Affiliation, (affiliation) => affiliation.students, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'affiliation_id', referencedColumnName: 'id' }])
  affiliation: Affiliation;

  @OneToMany(() => List, (list) => list.student)
  lists: List[];

  @OneToMany(() => Check, (check) => check.student)
  checks: Check[];

  @OneToMany(() => Schedule, (schedule) => schedule.student)
schedules: Schedule[];

@OneToMany(() => ClassroomSchedule, (classroomSchedule) => classroomSchedule.student)
classroomSchedules: ClassroomSchedule[];

}
