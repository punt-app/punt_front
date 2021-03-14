import { InjectionKey } from '@nuxtjs/composition-api'
import UserStore from '~/store/user'

const UserKey: InjectionKey<UserStore> = Symbol('UserStore')
export default UserKey
