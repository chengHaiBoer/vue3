import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import useMainStore from '../main'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersTotalCount = totalCount
      this.usersList = list
    },
    async deleteUserByIdAction(id: number) {
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      const newResult = await newUserData(userInfo)
      console.log(newResult)

      this.postUsersListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      console.log(editResult)

      this.postUsersListAction({ offset: 0, size: 10 })
    },

    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newResult = await newPageData(pageName, pageInfo)
      console.log(newResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editResult = await editPageData(pageName, id, pageInfo)
      console.log(editResult)
      this.postPageListAction(pageName, { offset: 0, size: 10 })

      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
