// Change header background colour on scroll and add 
// back to top button
window.addEventListener('scroll', function () {
  if (window.scrollY > 50) {
      document.querySelector('#site-header').classList.add('active');
  } else {
      document.querySelector('#site-header').classList.remove('active');
  }
  /*if (window.scrollY > window.innerHeight) {
      document.querySelector('.to-top-btn').classList.remove('hide');
  } else {
      document.querySelector('.to-top-btn').classList.add('hide');
  }*/
});

//Hamburger Menu
var siteHeader = document.querySelector('#site-header');
var hamburger = document.querySelector('.nav-burger');
var navLinks = document.querySelector('.nav-links')
  
document.querySelector(".nav-burger").addEventListener("click", function(){
  // siteHeader.classList.toggle('active');
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  navLinks.classList.toggle("collapsed");
  
  document.querySelectorAll('main, footer').forEach(item => {
      item.addEventListener('click', event => {
          hamburger.classList.remove("active");
          navLinks.classList.add("collapsed");
      });
  });
});


// Collapsing FAQ accordions (unfortunately due to the dynamic
// height of the answers, the transitions have a stutter when 
// closing them compared to opening if we use pure CSS. While 
// minor, it makes the experience feel unifinished, so we need 
// to use a larger amount of Javascript than we normally would,
// sorry!) This is the important part!
function hideFaq(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // temporarily disable all css transitions
    var elementTransition = element.style.transition;
    element.style.transition = '';
    
    // on the next frame (as soon as the previous style change has taken effect),
    // explicitly set the element's height to its current pixel height, so we 
    // aren't transitioning out of 'auto'
    requestAnimationFrame(function() {
      element.style.height = sectionHeight + 'px';
      element.style.transition = elementTransition;
      
      // on the next frame (as soon as the previous style change has taken effect),
      // have the element transition to height: 0
      requestAnimationFrame(function() {
        element.style.height = 0 + 'px';
      });
    });
    
    // mark the section as "currently collapsed"
    element.setAttribute('data-collapsed', 'true');
  }
  
  function showFaq(element) {
    // get the height of the element's inner content, regardless of its actual size
    var sectionHeight = element.scrollHeight;
    
    // have the element transition to the height of its inner content
    element.style.height = sectionHeight + 'px';
  
    // when the next css transition finishes (which should be the one we just triggered)
    element.addEventListener('transitionend', function(e) {
      // remove this event listener so it only gets triggered once
      element.removeEventListener('transitionend', arguments.callee);
      
      // remove "height" from the element's inline styles, so it can return to its initial value
      //element.style.height = null;
    });
    
    // mark the section as "currently not collapsed"
    element.setAttribute('data-collapsed', 'false');
  }
  
  var faqs = document.querySelectorAll(".faq-title");
  
  for (i = 0; i < faqs.length; i++) {
    faqs[i].addEventListener("click", function(e) {
      let content = this.nextElementSibling;
      let isCollapsed = content.getAttribute('data-collapsed') === 'true';
      this.classList.toggle("active");
      if(isCollapsed) {
        showFaq(content)
        content.setAttribute('data-collapsed', 'false')
      } else {
        hideFaq(content)
      }
    });
  }


/* We also need to use a bit of Javascript to showo and hide
our legal/privacy policy modals */

// Get the modal
var modal = document.querySelector('.toc-modal');
var closeModal = document.querySelectorAll('.toc-close');
var lastModal

// Add event listener for legal/privacy links
const tocLinks = document.querySelectorAll('.toc-link');
const tocModals = document.querySelectorAll('.toc-item')

// Display selected modal
for(let i = 0; i < tocLinks.length; i++) {
  tocLinks[i].addEventListener('click', function(event) {
    modal.style.display = "flex";
    modal.style.opacity = 1;
    tocModals[i].style.display = "block"
    lastModal = i
    event.preventDefault();
  });
}

// Close modal if clicking "x" or anywhere outside modal
window.onclick = function(event) {
  if (event.target == modal || event.target == closeModal[lastModal]) {
    modal.style.display = "none";
    modal.style.opacity = 0;
    tocModals[lastModal].style.display = "none";
  }
}