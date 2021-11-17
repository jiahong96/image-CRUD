<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary">
    <div class="container-fluid mx-2">
      <a
        class="navbar-brand mb-0 h1"
        href="/"
      >Bower<span class="fw-light">Bird</span></a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
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
              aria-current="page"
              href="/"
            >Images</a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-white"
              href="/about"
            >Pictures</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default { name: 'AppBar'}
</script>