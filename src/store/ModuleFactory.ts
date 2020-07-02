import { getModule } from 'vuex-module-decorators'
import Users from '@/store/module/Users'
import store from '@/store/index'
import Worlds from '@/store/module/Worlds'

export const usersModule = getModule(Users, store)

export const worldsModule = getModule(Worlds, store)
