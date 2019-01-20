import { buildSchema } from 'type-graphql'

import { ChangePasswordResolver } from '../modules/user/ChangePassword'
import { ConfirmUserResolver } from '../modules/user/ConfirmUser'
import { ForgotPasswordResolver } from '../modules/user/ForgotPassword'
import { LoginResolver } from '../modules/user/Login'
import { LogoutResolver } from '../modules/user/Logout'
import { MeResolver } from '../modules/user/Me'
import { RegisterResolver } from '../modules/user/Register'
import { ProfilePictureResolver } from '../modules/user/ProfilePicture'

export const createSchema = () => buildSchema({
    resolvers: [
        ChangePasswordResolver,
        ConfirmUserResolver,
        ForgotPasswordResolver,
        LoginResolver,
        LogoutResolver,
        MeResolver,
        RegisterResolver,
        ProfilePictureResolver
    ],
    authChecker: ({context: {req}}) => {
        // if (req.session.role === 1) return true
        // return false
        return !!req.session.userId;
    }
})
