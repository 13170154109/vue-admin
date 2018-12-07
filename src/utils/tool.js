export default class Verify {
  // 验证为空
  static isNull (str) {
    return str.length === 0 || str == null || str === ''
  }
  // 验证手机号
  static isPhone (str) {
    return /^13(\d{9})$|^15(\d{9})$|^14(\d{9})$|^17(\d{9})$|^18(\d{9})$/.test(str)
  }

  static isPhoneTips (phone) {
    console.log(this.isNull(phone))
    const reg = /^13(\d{9})$|^15(\d{9})$|^14(\d{9})$|^17(\d{9})$|^18(\d{9})$/
    if (this.isNull(phone)) {
      return '手机号不能为空'
    } else if (!reg.test(phone)) {
      return '手机号格式不正确'
    }
  }

  static isPwd (str) {
    return /^[\w]{6,12}$/.test(str)
  }

  static isPwdTips (pwd, tips) {
    const reg = /^[\w]{6,12}$/
    if (this.isNull(pwd)) {
      return tips + '不能为空'
    } else if (!reg.test(pwd)) {
      return tips + '格式不正确'
    }
  }

  // 验证身份证
  static isSFZ (sfz) {
    return /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(sfz)
  }
  // 验证银行卡
  static isYHK (yhk) {
    return /^([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})?/.test(yhk)
  }

  static isEmail (email) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
  }
  // 获取localstorage
  static getStorage (key) {
    return JSON.parse(localStorage.getItem(key))
  }
  // 设置localstorage
  static setStorage (key, v) {
    localStorage.setItem(key, JSON.stringify(v))
  }
  // 添加新key到localstorage
  static addStorage (key, addedV) {
    let oldVal = this.getStorage(key)
    let newVal = Object.assign(oldVal, addedV)
    console.log(newVal)
    this.setStorage(key, newVal)
  }
  // 移除localstorage
  static removeStorage (key) {
    localStorage.removeItem(key)
  }
}
