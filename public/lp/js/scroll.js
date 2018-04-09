//fullPage.js

fullpage.initialize('#scroll', {
  //anchor変えるとバグる・・・が、自分でこの機能実装するにはあまりに難しいです
  anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
  css3:false,
  'recordHistory': false,
  'onLeave': isScrolled
})

function isScrolled () {
  let body = document.getElementsByTagName('body')[0]
  let display = body.getAttribute('class')
  if (display !== null) {
    //remove scroll class
    let prevLeft = document.getElementsByClassName('scrollLeft')[0]
    let prevRight = document.getElementsByClassName('scrollRight')[0]
    prevLeft.classList.remove('scrollLeft')
    prevRight.classList.remove('scrollRight')

    //add scroll class
    let className = display.replace(/\s+fp-viewing-/g, '')
    let content = document.getElementsByClassName(className)[0]
    let left = content.children[0]
    let right = content.children[1]
    left.classList.add('scrollLeft')
    right.classList.add('scrollRight')
  }
}