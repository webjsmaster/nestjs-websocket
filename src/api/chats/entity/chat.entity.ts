import { ApiProperty } from "@nestjs/swagger";
import { MessageNewEntity } from "src/api/messages/entity/new-messges.entity";
import { UserNewEntity } from "src/api/users/entity/users-new.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('chats')
export class ChatEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @ApiProperty()
    @OneToMany(() => MessageNewEntity, (messages: MessageNewEntity) => messages.chat, {
        cascade: true
    })
    @JoinColumn({
        name: 'messages',
    })
    messages?: MessageNewEntity[]

    @ApiProperty({ type: [String]})
    @Column('varchar',{array: true})
    users?: string[]

    

    // @ApiProperty()
    // @ManyToOne(() => UserNewEntity, (users: UserNewEntity) => users.chats, {
    //     cascade: true,
    // })
    // @JoinColumn({
    //     name: 'user',
    // })
    // user: MessageNewEntity[]

    // @OneToOne(() => ChatsUsersEntity, (chats: ChatsUsersEntity) => chats.chat_id, {
    //     cascade: true
    //   })
    // chat_id: string
}