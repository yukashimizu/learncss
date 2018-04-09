window.addEventListener('load', topAnimation, false)

window.addEventListener('mouseover', freeAnimation, false)
window.addEventListener('mouseout', freeCancel, false)

//loop func
//control frag
let direction = 'plus'
function loop (value, max, min, speed) {
  if (direction === 'plus' && value > max) {
    direction = 'minus'
  } else if (direction === 'minus' && value < min) {
    direction = 'plus'
  }

  if (direction === 'plus') {
    value += speed
    return value
  } else if (direction === 'minus') {
    value -= speed
    return value
  }
}

//top animation
function topAnimation () {
  let svg = document.getElementById('people')
  let content = svg.contentDocument
  let requestId

  //silver
  function silverAnimation () {
    let silver = content.getElementById('silver_arm')
    let test = silver.getAttribute('transform')
    let max = 10
    let min = 0
    let speed = 0.2
    let rotate, id

    if (test === null) {
      rotate = 0
    } else {
      rotate = Number(test.slice(7, -11))
    }
    let value = loop(rotate, max, min, speed)
    silver.setAttribute('transform', `rotate(${value}, 430, 120)`)
  }
  silverAnimation()

  //gold
  function goldAnimation () {
    let gold = content.getElementById('gold_face')
    let test = gold.getAttribute('transform')
    let max = 10
    let min = 2
    let speed = 0.1
    let rotate, id

    if (test === null) {
      rotate = 2
    } else {
      rotate = Number(test.slice(7, -10))
    }
    let value = loop(rotate, max, min, speed)
    gold.setAttribute('transform', `rotate(${value}, 320, 90)`)
  }
  goldAnimation()

  //woman
  function womanAnimation () {
    let left = content.getElementById('woman_left_arm')
    let right = content.getElementById('woman_right_arm')
    let leftTest = left.getAttribute('transform')
    let rightTest = right.getAttribute('transform')
    let max = 5
    let min = -5
    let speed = 0.2
    let leftRotate, rightRotate, id
    
    //left
    if (leftTest === null) {
      leftRotate = -5
    } else {
      leftRotate = Number(leftTest.slice(7, -11))
    }
    let leftValue = loop(leftRotate, max, min, speed)
    left.setAttribute('transform', `rotate(${leftValue}, 220, 140)`)

    //right
    if (rightTest === null) {
      rightRotate = 5
    } else {
      rightRotate = Number(rightTest.slice(7, -11))
    }
    let rightValue = loop(rightRotate, max, min, speed)
    right.setAttribute('transform', `rotate(${rightValue}, 188, 138)`)
  }
  womanAnimation()

  //man
  function manAnimation () {
    let man = content.getElementById('man_face')
    let test = man.getAttribute('transform')
    let max = 15
    let min = -5
    let speed = 0.2
    let rotate, id

    if (test === null) {
      rotate = 0
    } else {
      rotate = Number(test.slice(7, -10))
    }
    let value = loop(rotate, max, min, speed)
    man.setAttribute('transform', `rotate(${value}, 140, 70)`)
  }
  manAnimation()

  //suit
  function suitAnimation () {
    let suit = content.getElementById('suit_face')
    let test = suit.getAttribute('transform')
    let max = 15
    let min = -5
    let speed = 0.3
    let rotate, id

    if (test === null) {
      rotate = 0
    } else {
      rotate = Number(test.slice(7, -9))
    }
    let value = loop(rotate, max, min, speed)
    suit.setAttribute('transform', `rotate(${value}, 25, 48)`)
  }
  suitAnimation()

  requestId = requestAnimationFrame(topAnimation)
}


//free animation
let move = 0
let max = 4
let min = -4
let freeId
function freeAnimation () {
  let svg = document.getElementById('freeObj')
  let content = svg.contentDocument.getElementsByClassName('cls-9')
  if (direction === 'plus' && move > max) {
    direction = 'minus'
  } else if (direction === 'minus' && move < min) {
    direction = 'plus'
  }

  if (direction === 'plus') {
    move += .1
  } else if (direction === 'minus') {
    move -= .1
  }
  for (let i = 0; i < content.length; i++) {
    content[i].setAttribute('transform', `translate(${move}, ${move})`)
  }
  freeId = window.requestAnimationFrame(freeAnimation)
}

function freeCancel () {
  window.cancelAnimationFrame(freeId)
}


//merit animation
function meritAnimation () {
  let svg = document.getElementById('meritObj')
  let content = svg.contentDocument
  let outer = content.getElementsByClassName('animation-circle1')[0]
  let middle = content.getElementsByClassName('animation-circle2')[0]
  let inner = content.getElementsByClassName('animation-circle3')[0]

  let style = outer.getAttribute('style')
  if(style == 'fill: rgb(0, 158, 214);') {
    outer.style.setProperty('fill', '#004ed6')
    middle.style.setProperty('fill', '#009ed6')
    inner.style.setProperty('fill', '#00cdff')
  } else if (style == 'fill: rgb(0, 78, 214);' || style == null) {
    outer.style.setProperty('fill', '#00cdff')
    middle.style.setProperty('fill', '#004ed6')
    inner.style.setProperty('fill', '#009ed6')
  } else if (style == 'fill: rgb(0, 205, 255);') {
    outer.style.setProperty('fill', '#009ed6')
    middle.style.setProperty('fill', '#00cdff')
    inner.style.setProperty('fill', '#004ed6')
  }
}
setInterval(meritAnimation, 1000)
