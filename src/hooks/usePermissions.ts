import useLoginStore from '@/store/login/login'

//权限
function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
