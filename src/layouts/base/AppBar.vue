<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <div class="container-fluid mx-4">
      <a
        class="navbar-brand mb-0 h1"
        href="/"
      >Bower<span class="fw-light">Bird</span></a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon" />
      </button>

      <div
        id="navbarSupportedContent"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a
              class="nav-link text-white"
              href="/"
            >
              <font-awesome-icon
                :icon="['fas', 'image']"
                size="lg"
              />
              Images
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-white"
              href="/about"
            >
              <font-awesome-icon
                :icon="['fas', 'hashtag']"
                size="lg"
              />
              Tags
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default { name: 'AppBar'}
</script>

<style scoped>
.navbar-brand {
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
}

.nav-link {
  font-size: 18px;
}
</style>