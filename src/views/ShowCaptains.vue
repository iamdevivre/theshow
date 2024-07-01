<template>
  <div class="py-5">
    <div class="container">
      <header class="pb-5">
        <nav class="nav nav-pills flex-column flex-sm-row">
          <RouterLink
            :to="{ name: 'Captains' }"
            class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold active"
            >캡틴</RouterLink
          >
          <RouterLink
            :to="{ name: 'Items' }"
            class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold"
            >캡틴 대상 선수</RouterLink
          >
        </nav>
      </header>
      <div>
        <h1 class="font-bold text-transparent tracking-tight max-w-2xl text-7xl">
          <span class="inline-block bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"
            >MLB 더 쇼 24<br />`{{ title }}` 캡틴 총 {{ total }} 선수</span
          >
        </h1>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <template v-for="(ability, index) in abilities" :key="ability">
            <input
              @click="inquiryCaptains('I', `${ability}`)"
              type="radio"
              class="btn-check"
              name="btnradio"
              :id="`btnradio${index}`"
              autocomplete="off"
              :checked="index === 0 ? true : false"
            />
            <label
              :class="`btn btn-outline-${index > 7 ? 'danger' : 'primary'}`"
              :for="`btnradio${index}`"
              >{{ ability }}</label
            >
          </template>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>선수</th>
            <th style="min-width: 60px">종합</th>
            <th style="min-width: 60px">위치</th>
            <th>팀</th>
            <th>능력</th>
            <th>1단계</th>
            <th>2단계</th>
            <th>3단계</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(captain, index) in captains" :key="captain.$.uuid">
            <tr class="align-top">
              <td scope="row">{{ index + 1 }}</td>
              <td><img :src="captain.$.img" :alt="captain.$.name" style="width: 50px" /></td>
              <td>
                <RouterLink
                  :to="{ name: 'Items', state: { searchParams: { uuid: captain.$.uuid } } }"
                  >{{ captain.$.name }}</RouterLink
                >
              </td>
              <td style="min-width: 60px">{{ captain.$.ovr }}</td>
              <td style="min-width: 60px">{{ captain.$.display_position }}</td>
              <td>{{ captain.$.team }}</td>
              <td>
                <p>{{ captain.$.ability_name }}</p>
                <small class="text-muted">{{ captain.$.ability_desc }}</small>
              </td>
              <template v-for="boost in captain.$.boosts" :key="boost.tier">
                <td class="align-top">
                  <p>{{ boost.description }}</p>
                  <small class="text-muted">
                    <template v-for="attribute in boost.attributes" :key="attribute.name">
                      {{ attribute.name }} {{ attribute.value }}<br />
                    </template>
                  </small>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>

      <template v-if="more">
        <div class="d-grid py-5">
          <button @click="inquiryCaptains('M')" type="button" class="btn btn-primary btn-lg">
            더보기
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

//페이지
let page = 0

//총 건수
let total = ref(0)

//더보기
let more = ref(false)

//제목
let title = ref(null)

//캡틴
const captains = reactive([])

//능력 필터
const abilities = ref(['Cornerstone', 'Team Captain', 'Other'])

/**
 * 캡틴 목록 조회
 */
const inquiryCaptains = async (mode, ability) => {
  //페이지 증가
  if (mode === 'I') {
    captains.splice(0)
    page = 1
  } else {
    page = page + 1
  }

  //능력치 조건
  if (!ability) {
    ability = 'Cornerstone'
  }

  //타이틀
  title.value = ability ? ability : '전체'

  //API 호출
  const res = await fetch(`/api/db/captains?page=${page}&ability=${ability}`)
  //응답
  const result = await res.json()

  //총 건수
  total.value = result.total

  //목록
  captains.push(...result.captains)

  //더보기
  if (total.value > page * 25) more.value = true
  else more.value = false
}

/**
 * 컴포넌트 마운트
 */
onMounted(async () => {
  inquiryCaptains()
})
</script>

<style></style>
