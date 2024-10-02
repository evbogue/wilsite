import express from 'npm:express'
import {marked} from 'npm:marked'
import fs from 'node:fs'

const app = express()

const js = `
<script>

let slideIndex = 0;
showSlides();

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Change image every 2 seconds
} 

</script>

`

const render = (filename, contents, slides) => {
  console.log(slides)
  const header = `
    <!doctype html>
      <html>
        <head>
          <title>Wil's site | ${filename}</title>
          <meta name='viewport' content='width=device-width initial-scale=1' />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
          <script src="https://unpkg.com/htmx.org@2.0.2"></script>
          <style>body { background: #e5e3df; color: #555; font-family: sans-serif;} a { color: #555;} main {width: 860px; margin-right: auto; margin-left: auto;} @media only screen and (max-width: 860px) { main {width: 100%;} }

* {box-sizing:border-box}

/* Slideshow container */
.slideshow-container {
  max-width: 1000px;
  position: relative;
  margin: auto;
}

/* Hide the images by default */
.mySlides {
  display: none;
}

/* Next & previous buttons */
.prev, .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}

/* Position the "next button" to the right */
.next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

/* On hover, add a black background color with a little bit see-through */
.prev:hover, .next:hover {
  background-color: rgba(0,0,0,0.8);
}

/* Caption text */
.text {
  color: #f2f2f2;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

/* Number text (1/3 etc) */
.numbertext {
  color: #f2f2f2;
  font-size: 12px;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

/* The dots/bullets/indicators */
.dot {
  cursor: pointer;
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.active, .dot:hover {
  background-color: #717171;
}

/* Fading animation */
.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {opacity: .4}
  to {opacity: 1}
}
           </style>
        </head>
        <body hx-boost="true">
          <main>
          <hr>
          <p><a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/blogs'>Blogs</a> | <a href='/products'>Products</a> | <a href='/podcasts'>Podcasts</a> | <a href='/contact'>Contact</a> | <a href='https://github.com/evbogue/wilsite'>Git</a></p><hr>
      `
     

  const footer = `
    <hr>
    <p>© Copyright 2024 Wil Bogue</p>
    </main>
    
  </body>
</html>
`

  if (slides) {
    console.log(slides)
    return header + slides + marked(contents) + js + footer
  } else {
    return header + marked(contents) + footer 
  }
}

const slideshow = `<div class="slideshow-container">
  <div class="mySlides fade">
    <div class="numbertext">1 / 3</div>
    <img src='ai1.jpg' style="width:100%">
    <div class="text">Caption Text</div>
  </div>

  <div class="mySlides fade">
    <div class="numbertext">2 / 3</div>
    <img src='ai2.jpg' style="width:100%">
    <div class="text">Caption Two</div>
  </div>

  <div class="mySlides fade">
    <div class="numbertext">3 / 3</div>
    <img src='ai3.jpg' style="width:100%">
    <div class="text">Caption Three</div>
  </div>

  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
</div>
`
app.use(express.static('images'))

app.get('/', async (req, res) => { res.send(render('Home', await Deno.readTextFile('./home.md'), slideshow))})
app.get('/about', async (req, res) => { res.send(render('About', await Deno.readTextFile('./about.md')))})
app.get('/blogs', async (req, res) => { res.send(render('Blogs', await Deno.readTextFile('./blogs.md')))})
app.get('/products', async (req, res) => { res.send(render('Products', await Deno.readTextFile('./products.md')))})
app.get('/podcasts', async (req, res) => { res.send(render('Podcasts', await Deno.readTextFile('./podcasts.md')))})
app.get('/contact', async (req, res) => { res.send(render('Contact', await Deno.readTextFile('./contact.md')))})

app.listen('3000', () => {
  console.log('Listening at http://localhost:3000')
})
