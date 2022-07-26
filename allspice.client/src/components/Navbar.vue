<template>
  <div class="header-img d-flex justify-content-end">
    <div>
      <div class="input-group pt-3">
        <input
          class="form-control border-end-0 border"
          type="search"
          value="search"
          id="example-search-input"
        />
        <span class="input-group-append">
          <button
            class="
              btn btn-outline-secondary
              bg-white
              border-start-0 border-bottom-0 border
              ms-n5
            "
            type="button"
          >
            <i class="mdi mdi-magnify"></i>
          </button>
        </span>
      </div>
    </div>

    <div class="p-3">
      <Login />
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.header-img {
  height: 125px;
  min-height: 125px;
  background-position: 50% 60%;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url("../src/assets/img/header.jpeg");
}
</style>
