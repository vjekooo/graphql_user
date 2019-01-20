
import { Length, IsEmail } from 'class-validator'
import { Field, InputType } from 'type-graphql'
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist'
import { PasswordInput } from '../../shared/passwordInput'

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(1, 30)
    firstName: string
    
    @Field()
    @Length(1, 30)
    lastName: string
    
    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({message: 'Email already exists'})
    email: string
}