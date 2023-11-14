import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  
  
  export class UserFromTokenEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ApiProperty()
    @Column()
    login: string;
  
    @ApiProperty()
    @Column()
    iat: number;
  

    @ApiProperty()
    @Column()
    exp: number;

}