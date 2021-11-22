<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #F9F9F9 !important;  
}

img, input.form-control, button.btn, div.card {
  border-radius: .5rem !important;
}

div.card.card-shadow {
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

input.form-control {
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
}

button.btn.btn-light {
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.35);
}
</style>
