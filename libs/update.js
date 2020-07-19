const axios = require('axios')
const compareVersions = require('compare-versions')

module.exports = async (v) =>{
    const {data} = await axios.get('https://nodejs.org/dist/index.json')
    return data.filter(node => {
        const cp = v
          ? (compareVersions(node.version, 'v' + v + '.0.0') >= 0)
          : true
        return node.lts && cp
      }).map(it => {
        // 踢出去 file 这个字段，其他的全部返回
        const { files, ...rest } = it
        return { ...rest }
      })
}