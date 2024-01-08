import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, AfterInsert } from 'typeorm';
import { tokenHelper, MailService } from '../helper/index';
import { compare, hash } from 'bcrypt';

@Entity({ name: 'librarians' })
export default class LibrarianEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    phone: number;

    @Column()
    password: string;

    // Constructor
    constructor(firstName: string, lastName: string, email: string, phone: number, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

    // Hooks
    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);
    }

    @AfterInsert()
    sendWelcomeEmail() {
        const payload = {
            subject: 'Welcome to Express Starter',
            html: 'Your account is created successfully!',
            to: `${this.fullName} <${this.email}>`,
        };
        this.sendMail(payload);
    }

    // Additional methods
    generateToken(expiresIn = '1h') {
        const data = { id: this.id, email: this.email };
        return tokenHelper.generateToken(data, expiresIn);
    }

    sendMail(mail: { subject: string; html: string; to: string; }) {
        const payload = { ...mail, to: `${this.fullName} <${this.email}>` };

        const mailService = MailService.getInstance();

        return mailService.sendMail({
            to: `${this.fullName} <${this.email}>`,
            subject: mail.subject,
            html: mail.html
        });
    }

    validatePassword(plainPassword: string | Buffer) {
        return compare(plainPassword, this.password);
    }

    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
