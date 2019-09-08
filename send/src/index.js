import './css.css'
import "regenerator-runtime/runtime"

// token 检测
function checkToken() {
  var jwt = localStorage.getItem('token')
  if (jwt) {
    if (location.href.split('?').length > 1) {
      var params = location.href.split('?')[1].split('&')
      for (var i = 0; i < params.length; i++) {
        if (params[i].indexOf('token') > -1) {
          jwt = params[i].replace('token=', '')
          localStorage.setItem('token', jwt)
          var realUrl = location.href.split('?')[0]
          console.log(realUrl)
          location.href = realUrl
          return
        }
      }
    }
    return
  } else {
    if (location.href.split('?').length > 1) {
      var params = location.href.split('?')[1].split('&')
      for (var i = 0; i < params.length; i++) {
        if (params[i].indexOf('token') > -1) {
          jwt = params[i].replace('token=', '')
          localStorage.setItem('token', jwt)
          var realUrl = location.href.split('?')[0]
          console.log(realUrl)
          location.href = realUrl
          return
        }
      }
    }
  }
  var rushbUrl = encodeURI('https://wx.redrock.team/234/barrage/user/enter')
  location.href = 'https://wx.redrock.team/magicloop/rushb?b=' + rushbUrl + '&scope=student'
}
checkToken()

// 之后的逻辑
const send = document.querySelector('.send')
const input = document.querySelector('.input')
const colorSelector = document.querySelector('#color')
const close = document.querySelector('.close')
const diolog = document.querySelector('.diolog')
const tip = document.querySelector('.tip')

const showTip = err => {
  diolog.style.display = 'block'
  tip.innerText = err
}

send.addEventListener('click', async e => {
  const text = input.value
  const color = colorSelector.value

  if (!text) {
    showTip('输入不能为空...')
    return
  }

  try {
    const res = await fetch(`https://wx.redrock.team/234/barrage/user/barrage?token=${localStorage.getItem('token')}`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        text,
        color,
      }),
    }).then(r => r.json())

    if (res.code === '10000') {
      input.value = ''
      showTip('发送成功')
    } if (res.code === '10012') {
      if (res.msg === 'you send some sensitive') {
        input.value = ''
        showTip('包含敏感词')
      } else {
        input.value = ''
        showTip('休息下再发吧 ^_^')
      }
    }
  } catch (e) {
    input.value = ''
    showTip('网络错误，请重试')
  }
})

close.addEventListener('click', e => {
  diolog.style.display = 'none'
})
