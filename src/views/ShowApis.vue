<template>
  <div class="py-5">
    <div class="container">
      <MenuHeader />
      <div>
        <h1 class="font-bold text-transparent tracking-tight max-w-2xl text-7xl">
          <span class="inline-block bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"
            >MLB 더 쇼 24<br />데이터 현행화</span
          >
        </h1>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <div class="row fs-2">
          <div class="col fw-bold">캡틴</div>
        </div>
        <div class="row fs-2 py-4">
          <div class="col-9">
            <div class="progress">
              <div
                class="progress-bar bg-info fs-3"
                role="progressbar"
                aria-label="Captains"
                :style="`width: ${captainsProgress}%`"
                :aria-valuenow="captainsProgress"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ captainsProgress }}%
              </div>
            </div>
          </div>
          <div class="col">
            <button @click="deleteCaptains" type="button" class="btn btn-danger btn-lg me-2">초기화</button>
            <button @click="insertCaptains" type="button" class="btn btn-success btn-lg">적재</button>
          </div>
        </div>
        <div class="row fs-2 pt-5">
          <div class="col fw-bold">아이템</div>
        </div>
        <div class="row fs-2 py-4">
          <div class="col-9">
            <div class="progress">
              <div
                class="progress-bar bg-info fs-3"
                role="progressbar"
                aria-label="Items"
                :style="`width: ${itemsProgress}%`"
                :aria-valuenow="itemsProgress"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ itemsProgress }}%
              </div>
            </div>
          </div>
          <div class="col">
            <button @click="deleteItems" type="button" class="btn btn-danger btn-lg me-2">초기화</button>
            <button @click="insertItems" type="button" class="btn btn-success btn-lg">적재</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'

//캡틴 변수
let captainsProgress = ref(100)

//아이템 변수
let itemsProgress = ref(100)

/**
 * 캡틴 데이터 초기화
 */
const deleteCaptains = async () => {
  //파라미터
  const params = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  }

  //API 호출
  const res = await fetch(`/api/captains`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  //응답
  const result = await res.json()

  //성공
  if (result.success) {
    captainsProgress.value = 0
  }
}

/**
 * 캡틴 데이터 적재
 */
const insertCaptains = async () => {
  //초기화
  await deleteCaptains()

  //파라미터
  const params = {
    page: 1,
  }

  //API 호출: 조회
  let res = await fetch(`/api/captains`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  //응답: 조회
  let result = await res.json()
  const totalPages = Number(result.totalPages)

  for (let i = 1; i <= totalPages; i++) {
    //페이지
    params.page = i

    //API 호출: 입력
    res = await fetch(`/api/captains`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    //응답: 입력
    result = await res.json()

    //성공
    if (result.success) {
      //프로그레스 표시
      captainsProgress.value = ((i / totalPages) * 100).toFixed(2)
    }
  }
}

/**
 * 아이템 데이터 초기화
 */
const deleteItems = async () => {
  //파라미터
  const params = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  }

  //API 호출
  const res = await fetch(`/api/items`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  //응답
  const result = await res.json()

  //성공
  if (result.success) {
    itemsProgress.value = 0
  }
}

/**
 * 아이템 데이터 적재
 */
const insertItems = async () => {
  //초기화
  await deleteItems()

  //파라미터
  const params = {
    page: 1,
  }

  //API 호출: 조회
  let res = await fetch(`/api/items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  //응답: 조회
  let result = await res.json()
  const totalPages = Number(result.totalPages)

  for (let i = 1; i <= totalPages; i++) {
    //페이지
    params.page = i

    //API 호출: 입력
    res = await fetch(`/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })

    //응답: 입력
    result = await res.json()

    //성공
    if (result.success) {
      //프로그레스 표시
      itemsProgress.value = ((i / totalPages) * 100).toFixed(2)
    }
  }
}
</script>

<style>
.progress,
.progress-stacked {
  height: 50px;
}
</style>
