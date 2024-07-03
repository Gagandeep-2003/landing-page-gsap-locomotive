function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.1 // Adjust this value for smoother scroll
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

locomotiveAnimation();

function loadingAnimation(){
  
  gsap.fromTo(
    "#nav",
    { opacity: 0 },
    {
      opacity: 1,
      // display: "none",
      duration: 1.5,
      delay: 4,
    }
  );
  
  gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 3.7,
    }
  );
  
  gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );
  
}

loadingAnimation();

function responsiveNavbarAnimation(){
  document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.querySelector('.ri-menu-fill');
    const closeIcon = document.getElementById('close-icon');
    const overlay = document.getElementById('overlay');
    const navigation = document.getElementById('navigation');
    const previousNavbar = document.querySelector('#twogood')
    const previousNavbarLinks = document.querySelectorAll('#nav-part2 #links a')

    menuIcon.addEventListener('click', toggleNavigation);
    closeIcon.addEventListener('click', toggleNavigation);
    overlay.addEventListener('click', toggleNavigation); // Close overlay on clicking outside navigation
    menuIcon.addEventListener('click', () => {
      previousNavbar.style.color = 'white';
      previousNavbarLinks.style.color = 'white';
    })
    
    menuIcon.addEventListener('click', () => {
      previousNavbarLinks.forEach(link => {
        link.style.color = 'white';
      });
    })
    
    function toggleNavigation() {
      const isOpen = overlay.style.height === '100%';
        previousNavbarLinks.forEach(link => {
          link.style.color = '#5f5f5f';
        });
      previousNavbar.style.color = 'black';
        overlay.style.height = isOpen ? '0' : '100%';
        navigation.style.height = isOpen ? '0' : '100vh'; // Adjust height as needed
    }
});


}

responsiveNavbarAnimation();

function navbarAnimation() {
  gsap.to("#nav-part1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main", //scroller will always be  main as we have used locomotive for smooth scroll
      start: "top 0",
      end: "top -5%",
      scrub: true
    }
  });
  gsap.to("#nav-part2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true
    }
  });
}
navbarAnimation();

function videoconAnimation() {
  var videocon = document.querySelector("#video-container");
  var playbtn = document.querySelector("#play");
  videocon.addEventListener("mouseenter", function () {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
    });
  });
  videocon.addEventListener("mouseleave", function () {
    gsap.to(playbtn, {
      scale: 0,
      opacity: 0
    });
  });
  document.addEventListener("mousemove", function (dets) {
    gsap.to(playbtn, {
      left: dets.x - 70,
      top: dets.y - 80
    });
  });
}
videoconAnimation();

function loadinganimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5,
    duration: 0.9,
    stagger: 0.3
  });
  gsap.from("#page1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.3,
    duration: 0.5
  });
}
loadinganimation();

function cursorAnimation() {
  document.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      left: dets.x,
      top: dets.y
    });
  });
  document.querySelectorAll(".child").forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)"
      });
    });
    elem.addEventListener("click", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(14)"
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)"
      });
    });
  });
}
cursorAnimation();

function clickedCursorAnimaiton() {
  document.querySelectorAll(".child a img").forEach((elem) => {
    elem.addEventListener("click", () => {
      gsap.to('#cursor', {
        scale: 100,
        duration: 0.5, // Add duration for smooth animation
        ease: "power2.out" // Optional: Add easing for smoother animation
      });
    });
  });
}

// Horizontal scroll using gsap
const container = document.querySelector(".container");
const sections = gsap.utils.toArray(".container section");
const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask");

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    scroller: "#main",
    pin: true,
    scrub: 1,
    end: "+=3000",
    snap: 1 / (sections.length - 1),
    // markers: true
  }
});

// console.log(1 / (sections.length - 1));

// Progress bar animation
gsap.to(mask, {
  width: "100%",
  scrollTrigger: {
    trigger: ".wrapper",
    scroller: "#main",
    start: "top left",
    scrub: 1
  }
});

// Whizz around the sections
sections.forEach((section) => {
  // Grab the scoped text
  let text = section.querySelectorAll(".anim");

  // Bump out if there's no items to animate
  if (text.length === 0) return;

  // Do a little stagger
  gsap.from(text, {
    y: -130,
    opacity: 0,
    duration: 2,
    ease: "elastic",
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: "left center",
      // markers: true
    }
  });
});

// Image heatwave effect 
function imageHeatWaveEffect(){
  let img1 = document.querySelector('#img1');
  let img2 = document.querySelector('#img2');
  
  const imgs = [img1, img2];
  let timeoutId;

  imgs.forEach((img, index) => {
      img.addEventListener("mouseover", () => {
          gsap.to(`#heatwave${index + 1}`, 2, {
              attr: { baseFrequency: "0.022 0.01" },
          });

          timeoutId = setTimeout(() => {
              gsap.to(`#heatwave${index + 1}`, 2, {
                  attr: { baseFrequency: "0.00 0.00" },
              });
          }, 2000); // Change to 2000 to match the 2-second duration
      });

      img.addEventListener("mouseleave", () => {
          clearTimeout(timeoutId); // Clear the timeout if the mouse leaves before 2 seconds
          gsap.to(`#heatwave${index + 1}`, 2, {
              attr: { baseFrequency: "0.00 0.00" },
          });
      });
  });
}

imageHeatWaveEffect();
