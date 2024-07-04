<template>
  <header class="pb-5">
    <nav class="nav nav-pills flex-column flex-sm-row">
      <RouterLink :to="{ name: 'Captains' }" class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold">캡틴</RouterLink>
      <RouterLink :to="{ name: 'Items' }" class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold"
        >캡틴 대상 선수</RouterLink
      ><RouterLink :to="{ name: 'Apis' }" class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold"
        >데이터 현행화</RouterLink
      >
    </nav>
  </header>
</template>
