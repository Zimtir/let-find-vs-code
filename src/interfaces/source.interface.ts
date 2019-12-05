import CommonHelper from '../helpers/common.helper'
import LogHelper from '../helpers/log.helper'

export default interface Source {
  title: string
  url: string
  find?: (query: string) => Promise<Source[]>
  description?: string
  updated?: string

  logHelper: LogHelper
  commonHelper: CommonHelper
}
