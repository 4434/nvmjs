import Vue from 'vue'
import loadingComponent from '@/components/common/loading/Loading.vue'

const LoadingConstructor = Vue.extend(loadingComponent)

const instance = new LoadingConstructor({
    el: document.createElement('div')
})

instance.show = false // 默认隐藏

const loading = {
  show() { // 显示方法
    instance.loading = true
    document.body.appendChild(instance.$el)
  },
  hide() { // 隐藏方法
    instance.loading = false
  }
}

export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading
    }
    Vue.mixin({
      created() {
        this.$loading = Vue.$loading
      }
    })
  }
}
