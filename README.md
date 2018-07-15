# MasMenu

### Demo
> [See here]

### Installation
Add library to your project from dist folder:
```html
<script src="scripts/masmenu.min.js"></script>
```

### Usage

HTML:
```html
  <nav class="js-menu">
    <a href="#">Home</a>
    <a href="#">Works</a>
    <a href="#">About</a>
    <a href="#">Contacts</a>
  </nav>
```

Javascript:
```javascript
  new MasMenu({
    el: '.js-menu' // selector or DOM node
  })
```
### Options
```javascript
{
  speedPerLetterMs: <Number> Default: 100
  randomMode: <Boolean> Default: false
}
```

> Inspired by [Beauborg]

[See here]: <https://elegant-kepler-38ee75.netlify.com/>
[Beauborg]: <https://beaubourg.paris/en>