<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #F9F9F9 !important;  
}

img, 
input.form-control, 
button.btn, 
div.card, div.card-header:first-child, div.card-footer:first-child {
  border-radius: .5rem;
}

div.card.card-shadow {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

input.form-control {
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
  border: 0;
}

button.btn.btn-light {
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.35);
}
</style>
