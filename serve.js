import express from 'npm:express'
import {marked} from 'npm:marked'
import fs from 'node:fs'

const app = express()

const render = (filename, contents) => {
  const header = `
    <!doctype html>
      <html>
        <head>
          <title>Wil's site | ${filename}</title>
          <link rel="stylesheet" href="https://unpkg.com/missing.css@1.1.3">      
        </head>
          <main>
          <hr>
          <p><a href='/'>Home</a> | <a href='/about'>About</a> | <a href='/blogs'>Blogs</a> | <a href='/podcasts'>Podcasts</a> | <a href='/contact'>Contact</a></p><hr>
      `
     

  const footer = `
    <hr>
    <p>© Copyright 2024 Wil Bogue</p>
    </main>
    
  </body>
</html>
`
  return header + marked(contents) + footer 
}

app.get('/', async (req, res) => { res.send(render('Home', await Deno.readTextFile('./home.md')))})
app.get('/about', async (req, res) => { res.send(render('About', await Deno.readTextFile('./about.md')))})
app.get('/blogs', async (req, res) => { res.send(render('Blogs', await Deno.readTextFile('./blogs.md')))})
app.get('/podcasts', async (req, res) => { res.send(render('Podcasts', await Deno.readTextFile('./podcasts.md')))})
app.get('/contact', async (req, res) => { res.send(render('Contact', await Deno.readTextFile('./contact.md')))})

app.listen('3000', () => {
  console.log('Listening at http://localhost:3000')
})
