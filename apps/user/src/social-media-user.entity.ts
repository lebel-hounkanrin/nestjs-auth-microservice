import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SocialMediaUser{
    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @Column({type: "varchar", nullable: true})
    userName: string;

    @Column({type: "varchar", nullable: true})
    phoneNumber?: string;

    @Column({type: "varchar", nullable: true, unique: true})
    email?: string;

    @Column("varchar", {nullable: false})
    provider: string;
    
    @Column("varchar", {nullable: false})
    socialMediaId: string

    @Column("varchar", {nullable: true})
    refreshToken?: string

    @CreateDateColumn()
    createdAt: Date;

}