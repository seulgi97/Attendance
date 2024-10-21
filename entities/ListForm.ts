import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { List } from './List';

@Entity('list_form', { schema: 'attendance' })
@Index('name', ['name'], { unique: true })
export class ListForm {
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

  @OneToMany(() => List, (list) => list.listForm)
  lists: List[];
}