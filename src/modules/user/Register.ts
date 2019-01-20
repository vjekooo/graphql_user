
import { Query, Resolver, Mutation, Arg, UseMiddleware } from 'type-graphql'
import bcrypt from 'bcryptjs'

import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { isAuth } from '../middleware/isAuth'
import { logger } from '../middleware/logger'
import { sendMail } from '../utils/sendMail'
import { createConfirmationUrl } from '../utils/createConfirmUrl'

@Resolver()
export class RegisterResolver {
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async hello() {
        return 'Hello World'
    }

    @Mutation(() => User)
    async register(
        @Arg('data') {firstName, lastName, email, password}: RegisterInput
    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save()

        await sendMail(user.email, await createConfirmationUrl(user.id), 0)

        return user
    }
}