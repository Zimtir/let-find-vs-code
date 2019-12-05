import axios from 'axios'

import Source from '../interfaces/source.interface'

import CommonHelper from '../helpers/common.helper'
import LogHelper from '../helpers/log.helper'

export default class StackOverflowModel implements Source {
  logHelper: LogHelper
  commonHelper: CommonHelper

  constructor(query: string) {
    this.title = `🔎 Search Stackoverflow: ${query}`
    this.url = `https://stackoverflow.com/search?q=${encodeURIComponent(query)}`

    this.logHelper = new LogHelper()
    this.commonHelper = new CommonHelper()
  }
  title: string
  url: string

  async find(search: string): Promise<Source[]> {
    let url = 'https://api.stackexchange.com/2.2/search?'

    let params = [
      'order=desc',
      'sort=relevance',
      `intitle=${encodeURIComponent(search)}`,
      'site=stackoverflow',
      `key=${process.env.STACKOVERFLOW_API_KEY}`
    ]

    const response = await axios.get(url + params.join('&'))

    let index = 0

    const sources = response.data.items.map(
      (result: any): Source => {
        index++

        let title = this.commonHelper.checkOrEmpty(result.title)
        let tagList = result.tags.join(',')
        let count = result.answer_count
        let score = result.score
        let status = result.is_answered ? '✅' : '🛠'

        return {
          title: `${index}: ${status} ${score} 😃 ${count} ➡ ${title} 🏷️${tagList}`,
          url: result.link,
          logHelper: this.logHelper,
          commonHelper: this.commonHelper
        }
      }
    )

    return sources
  }
}
