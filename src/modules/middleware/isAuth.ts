
import { MiddlewareFn } from 'type-graphql'

import { MyContext } from '../../types/MyContext'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if (context.req.session!.role !== 'admin') {
        throw new Error('You need to have admin permission to access this part of this awesome website')
    }

    return next()
};