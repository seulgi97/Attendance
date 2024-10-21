import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CheckList } from './CheckList';
import { Check } from './Check';

@Entity('check_form', { schema: 'attendance' })
export class CheckForm {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'check_list_id', nullable: true, comment: 'check_list id' })
  checkListId: number | null;

  @Column('varchar', { name: 'name', length: 128, comment: '이름' })
  name: string;

  @ManyToOne(() => CheckList, (checkList) => checkList.checkForms)
  @JoinColumn([{ name: 'check_list_id', referencedColumnName: 'id' }])
  checkList: CheckList;

  @OneToMany(() => Check, (check) => check.checkForm)
  checks: Check[];
}