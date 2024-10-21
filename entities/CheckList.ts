import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CheckForm } from './CheckForm';
import { Check } from './Check';

@Entity('check_list', { schema: 'attendance' })
@Index('name', ['name'], { unique: true })
export class CheckList {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 32, comment: '이름' })
  name: string;

  @Column('tinyint', {
    name: 'is_activation',
    width: 1,
    default: 1,
    comment: '활성화 여부',
  })
  isActivation: boolean;

  @OneToMany(() => CheckForm, (checkForm) => checkForm.checkList)
  checkForms: CheckForm[];

  @OneToMany(() => Check, (check) => check.checkList)
  checks: Check[];
}