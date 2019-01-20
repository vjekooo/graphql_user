import { testConn } from '../../../test-utils/testCon'
import { Connection } from 'typeorm'

import { graphqlCall } from '../../../test-utils/graphqlCall'
import { User } from '../../../entity/User'

let conn: Connection

beforeAll(async () => {
    conn = await testConn()
})

afterAll(async() => {
    await conn.close()
})

const registerMutation = `
    mutation Register($data: RegisterInput!) {
        register(
            data: $data
    )
        {
            id
            firstName
            lastName
            email
            name
        }
    }
`

describe('Register', () => {
    it('creates user', async () => {
        const user = {
            firstName: 'Danko',
            lastName: 'Bananko',
            email: "danko.banana@mail.com",
            password: "12345"
        }
        const response = await graphqlCall({
            source: registerMutation,
            variableValues: {
                data: user
            }
        })
        expect(response).toMatchObject({
            data: {
                register: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                }
            }
        })

        const dbUser = User.findOne({where: user.email})
        expect(dbUser).toBeDefined()
    })
})