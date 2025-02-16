import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}

//EXCEPTION FILTERS folder exceptions app.use exeption filters useGlobalFilters 

//репозитроии посмотерть и импортировтаь вместо имплеметнации модуля ( то есть модуль не надо лишний раз в другой)
