import { hash } from "bcrypt";
import { IsEmail, Min } from "class-validator";
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
   
    @Column({type: "varchar", nullable: true})
    userName: string;

    @Column({type: "varchar", nullable: false, unique: true})
    phoneNumber: string;

    @Column({type: "varchar", nullable: true, unique: true})
    email?: string;
    
    @Column({ nullable: true })
    //@Exclude({ toPlainOnly: true })
    password: string;

    @BeforeInsert()
    private async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @Column("varchar", {nullable: true})
    facebookId?: string;

    @Column("varchar", {nullable: true})
    googleId?: string;

    @Column({
        type: "boolean",
        default: false
    })
    isPhoneNumberConfirmed?: boolean;

    @CreateDateColumn()
    createdAt: Date;

}
