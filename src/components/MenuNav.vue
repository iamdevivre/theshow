<template>
  <section class="py-5 text-center container">
    <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="fw-light">MLB The Show 24 Captains</h1>
        <p class="lead text-body-secondary">...</p>
        <p>
          <RouterLink :to="{ name: 'DbCaptains' }" class="btn btn-primary my-2 me-2"
            >캡틴</RouterLink
          >
          <RouterLink :to="{ name: 'DbListings' }" class="btn btn-secondary my-2 ms-2"
            >카드</RouterLink
          >
        </p>
      </div>
    </div>
  </section>
</template>
