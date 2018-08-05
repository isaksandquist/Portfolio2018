function scrolledHeader () {
    var scrollOffset = window.pageYOffset;
    var startHeight = document.getElementById('start').offsetHeight;
    var header = document.getElementById('header');
    
    if (scrollOffset >= 1) {
        header.className = 'active';
    } else {
        header.className = '';
    }
}

function activeNavLink () {
    var scrollOffset = window.pageYOffset;
    var sectionElement = document.querySelectorAll('.main section');
    
    for(var i=0; i<sectionElement.length; i++) {
        var elementOffsetTop = sectionElement[i].offsetTop - scrollOffset;
        
        if (elementOffsetTop <= 0) {
            if (i > 0) {
                document.querySelectorAll('#header li')[i-1].className = '';
            }
            document.querySelectorAll('#header li')[i].className = 'active';
        } else if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            document.querySelectorAll('#header li')[i-1].className = '';
            document.querySelectorAll('#header li')[3].className = 'active';
        } else {
            document.querySelectorAll('#header li')[i].className = '';
        }
    }
}

function titleOpacity () {
    var scrollOffset = window.pageYOffset;
    var scrollOpacity = 1-scrollOffset*0.003;
    
    document.getElementById('title').style.opacity = scrollOpacity;
    document.getElementById('scroll-indicator-wrapper').style.opacity = scrollOpacity;
}

function revealElement () {
    var scrollOffset = window.pageYOffset;
    var element = document.querySelectorAll('.reveal');
    for (var i=0; i < element.length; i++) {
        if (!element[i].classList.contains('animated') && element[i].offsetTop - window.innerHeight <= scrollOffset - 300) {
            var classes = element[i].className;
            var newClasses = classes.concat(' animated');
            element[i].className = newClasses;
        }
    }
}


var charIndex = 0;
var txt = document.getElementById("text").innerHTML;
var formatedTxt = txt.replace(/<\/?span[^>]*>/g,"");

function typeWriter() {
  if (charIndex < formatedTxt.length) {
    document.getElementById("title").innerHTML += formatedTxt.charAt(charIndex);
    charIndex++;
    var randomNumber = Math.floor(Math.random() * (120-60)) + 60;
    setTimeout(typeWriter, randomNumber);
  } else {
    document.getElementById("title").innerHTML = txt;
    document.getElementById("scroll-indicator").className = "visible";
  }
}

var togglers = document.querySelectorAll('#hamburger, #navigation a');
for (var i=0; i < togglers.length; i++) {
    togglers[i].addEventListener('click', function() {
        var navElement = document.getElementById('navigation');
        navElement.classList.toggle('active');
    });
}

document.addEventListener('scroll', function() {
    scrolledHeader();
    titleOpacity();
    activeNavLink();
    revealElement();
});

function viewportHeight () {
    document.getElementById("start").style.height = document.documentElement.clientHeight + "px";
}

window.addEventListener('resize', function() {
    viewportHeight();
});

viewportHeight();

var scroll = new SmoothScroll('a[href*="#"]');

window.onload = function() {
    document.body.className = "";
    activeNavLink();
    revealElement();
    setTimeout(function(){
        typeWriter();
    }, 800);
}