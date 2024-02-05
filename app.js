
let div = document.createElement('div')
div.className ='startBorder'
div.innerHTML = (`<h1>Приветсвую вас !
 Данный прект зарзаботан для подбора цветовсуществует 5 колонок со случайной генерацией цвета для смены палитры нажмите <i class="fa-solid fa-keyboard" data-type="iconSpace"></i> "Space" для закрепления выбранного цвета нажмите на кнопку 
<i class="fa-solid fa-lock-open" data-type="lock"></i>
, нажав на #код цвета вы скопируете его в буфер обмена
удачи в творчестве! </h1>`)
document.body.prepend(div)


document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    div.className= 'col'
    div.remove('h1')
    // bildColums()
  }
})

const cols = document.querySelectorAll('.col')

document.addEventListener('keydown', (event) => {
  event.preventDefault()
  if (event.code.toLowerCase() === 'space') {
    setRandomColors()
  }
})

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type
  if (type === 'iconSpace') {
    div.className= 'col'
    div.remove('h1')
     }
    else if (type === 'lock') {
      const node =
        event.target.tagName.toLowerCase() === 'i'
          ? event.target
          : event.target.children[0]

      node.classList.toggle('fa-lock-open')
      node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
      copyToClickboard(event.target.textContent)
    }
})


function copyToClickboard(text) {
    alert(' Текст скопирован')
  return navigator.clipboard.writeText(text)
  
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : []

  cols.forEach((col, index) => {
    const isLocked = col.querySelector('i').classList.contains('fa-lock')
    const text = col.querySelector('h2')
    const button = col.querySelector('button')

    if (isLocked) {
      colors.push(text.textContent)
      return
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random()

    if (!isInitial) {
      colors.push(color)
    }

    text.textContent = color
    col.style.background = color

    setTextColor(text, color)
    setTextColor(button, color)
  })

  updateColorsHash(colors)
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance()
  text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1)
    })
    .join('-')
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split('-')
      .map((color) => '#' + color)
  }
  return []
}

setRandomColors(true)


