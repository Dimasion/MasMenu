# MasMenu

### Demo
> [See here]

### Installation
Add library to your project from dist folder:
```sh
<script src="scripts/masmenu.min.js"></script>
```

### Usage

HTML:
```sh
  <nav class="menu js-menu">
    <a href="#" class="menu-item">Home</a>
    <a href="#" class="menu-item">Works</a>
    <a href="#" class="menu-item">About</a>
    <a href="#" class="menu-item">Contacts</a>
  </nav>
```

Javascript:
```sh
  new MasMenu({
    el: '.js-menu' (selector or DOM node)
  })
```
### Options
```sh
{
  speedPerLetterMs: <Number; Default: 100;>
  randomMode: <Boolean; Default: false;>
}
```

> Inspired by [Beauborg]

[See here]: <https://elegant-kepler-38ee75.netlify.com/>
[Beauborg]: <https://beaubourg.paris/en>