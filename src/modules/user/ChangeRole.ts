
import { Resolver, Mutation, Arg } from 'type-graphql'
import { User } from '../../entity/User'

@Resolver()
export class ChangeRoleResolver {
    @Mutation(() => Boolean)
    async changeRole(
        @Arg('id') id: number,
        @Arg('role') role: number
    ): Promise<boolean> {

        const roles: any = {
            0: 0, // user
            1: 1, // admin
            2: 2 // super admin
        }

        const user: any = await User.findOne({where: {id}})
        if (!user) return false
        let newRole: number = roles[role]
        
        await User.update({id: user.id}, {role: newRole})

        return true
    }
}