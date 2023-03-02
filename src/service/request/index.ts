import axios from 'axios'
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
interface HBInterceptors<T = AxiosResponse> {
  //test
  requestSuccessFun?: (
    value: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig
  requestErrorFun?: (err: any) => any
  responseSuccessFun?: (res: T) => T //test
  responseErrorFun?: (err: any) => any
}
interface HBRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HBInterceptors<T> //test
}
class HBRequest {
  //1每个请求实例可以是不同的axios
  instance: AxiosInstance
  constructor(config: HBRequestConfig) {
    this.instance = axios.create(config)

    //每个实例都会有的拦截

    this.instance.interceptors.request.use(
      (config) => {
        //loading//token

        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //loading//token
        const data = res.data
        return data
      },
      (err) => {
        return err
      }
    )
    //单独实例的拦截器
    // if(config.interceptors) {
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFun,
      config.interceptors?.requestErrorFun
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFun,
      config.interceptors?.responseErrorFun
    )
    // }
  }

  //2test
  request<T = any>(config: HBRequestConfig<T>) {
    if (config.interceptors?.requestErrorFun) {
      //单次拦截，如果有加一个拦截器的话，就在这个求里面加一个拦截器
      config = config.interceptors.requestErrorFun(config)
    }
    return new Promise<T>((resolve, rejected) => {
      //在发送请求的时候把1配置项放进去
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFun) {
            //这边其实是手动调用外面的拦截器
            res = config.interceptors.responseSuccessFun(res)
          }
          resolve(res) //test这里的类型和外面的不一样这里是response
        })
        .catch((err) => {
          rejected(err)
        })
    })
  }

  get<T>(config: HBRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }

  post<T>(config: HBRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: HBRequestConfig<T>) {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HBRequestConfig<T>) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default HBRequest
