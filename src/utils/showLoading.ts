import NProgress from 'nprogress'
// 显示全屏loading
export function showFullLoading() {
  NProgress.start()
}

// 隐藏全屏loading
export function hideFullLoading() {
  NProgress.done()
}


