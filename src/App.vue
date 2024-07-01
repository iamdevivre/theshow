<template>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
@import url('https://fonts.googleapis.com/css?family=Abel');

html,
body {
  height: 100%;
}

body {
  margin: 0;
  /* background: linear-gradient(45deg, #49a09d, #5f2c82); */
  font-family: 'Abel', 'Noto Sans KR';
  font-optical-sizing: auto;
  font-weight: 300;
  font-style: normal;
  font-size: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 15px;
  background-color: #fff;
}

th {
  text-align: left;
  color: #fff;
}

td {
  color: #000;
}

thead {
  th {
    background-color: #55608f;
  }
}

tbody {
  tr {
    &:hover {
      background-color: #a04983;
    }
  }
}

/* 타이틀 */
.font-bold {
  font-weight: 900;
}

.text-transparent {
  color: transparent;
}

.text-7xl {
  font-size: 4.5rem;
}

.max-w-2xl {
  max-width: 58rem;
}

.tracking-tight {
  letter-spacing: -0.025em;
}

.inline-block {
  display: inline-block;
}

.to-blue-600 {
  --tw-gradient-to: #2563eb;
}

.from-green-600 {
  --tw-gradient-from: #059669;
  --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(5, 150, 105, 0));
}

.bg-gradient-to-r {
  background-image: linear-gradient(90deg, var(--tw-gradient-stops));
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* 글자 크기 */
.fs-7 {
  font-size: 0.9rem !important;
}

.fs-8 {
  font-size: 0.8rem !important;
}

.fs-9 {
  font-size: 0.7rem !important;
}
</style>
