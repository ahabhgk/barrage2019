import './css.css'
import "regenerator-runtime/runtime"

// token 检测
const tokenParam = location.href.split('?')[1]

if (tokenParam) {
  localStorage.setItem('token', tokenParam.split('=')[1])
}

const token = localStorage.getItem('token')

if (!token) {
  location.href = 'https://wx.redrock.team/magicloop/rushb?b=https%3a%2f%2fwx.redrock.team%2f234%2fbarrage%2fenter&scope=student'
}

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
    const res = await fetch('https://hongyan.cqupt.edu.cn/barrage/user/barrage?token=eyJyZWRJZCI6IjJjMTIyYzA5MDIzNWMzMWQ4MjY1ZDYxZDNmMTgwYjNhNjY1YmFiZGUiLCJoZWFkSW1nVXJsIjoiaHR0cDovL3RoaXJkd3gucWxvZ28uY24vbW1vcGVuL3ZpXzMyL1JwNHJOSUlZZG1TTkhFMU5IdkFHbXlQRTNENFB3eXhpYW5sb2NneXBwWFBHUGgycndkbkM3Wnc2SWQ1TFk3WThOakNZQmxpYldURms0aWJ6bnRFaDdNWGliZy8xMzIiLCJuaWNrbmFtZSI6ImFoYWJoZ2siLCJzdHVkZW50TnVtIjoiMjAxODIxNDEzOSIsInJlYWxOYW1lIjoi5L2V5bqa5Z2kIiwiY29sbGFnZSI6Iui9r S7tuW3peeoi WtpumZoiIsIm1ham9yIjoiIiwiY2xhc3MiOiIxMzAwMTgwNyJ9.V14mszMIiM4Uock6K0dPnuGfRRk1xJb2f7Z7dtXxteXUB/Z3vlaNihTp1h96zMe4Pou/ nntS/sp0U5UeQDsLBnkHCM2Jc N6rmhJoHtQZJtw/aADnPhIdC6N7KwjCVy0e4RWZyxK7Tx2Tc5GWmANH1vrIASs9 HmcuuJHeoQkE3pe8hcFnsd6ivxB1uIUy4BXQjjpojgdQPqIHIfs737t5w116ZIUTrJwI6NjJ5p0sIplLBy8EwHmsyfAurm2xrBsNofZi9raRFOOl1TKjq4H1bQ/fG g8QqXFRki0m7vPKcATKK8ZDCH/5RNXed/DXawwwkBKgkRNiAMWsKLtmoQ==', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        text,
        color,
      }),
    }).then(r => r.json())

    if (res.code === 10000) {
      showTip('发送成功')
    } if (res.code === 10012) {
      throw new Error(res.msg + '^_^')
    }
  } catch (e) {
    input.value = ''
    showTip(e)
  }
})

close.addEventListener('click', e => {
  diolog.style.display = 'none'
})
