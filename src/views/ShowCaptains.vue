<template>
  <div class="py-5">
    <div class="container">
      <header class="pb-5">
        <nav class="nav nav-pills flex-column flex-sm-row">
          <RouterLink :to="{ name: 'Captains' }" class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold active"
            >캡틴</RouterLink
          >
          <RouterLink :to="{ name: 'Items' }" class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold"
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
        <div class="row">
          <div class="col-md-auto">
            <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
              <template v-for="(ability, index) in abilities" :key="ability">
                <input
                  @click="inquiryCaptains('I')"
                  type="radio"
                  class="btn-check"
                  name="ability"
                  :id="`ability${index}`"
                  :value="ability"
                  autocomplete="off"
                  :checked="index === 0 ? true : false"
                />
                <label class="btn btn-outline-primary" :for="`ability${index}`">{{ ability }}</label>
              </template>
            </div>
          </div>

          <div class="col-md-auto">
            <select @change="inquiryCaptains('I')" class="form-select" aria-label="Default select example">
              <option value="">--- 아메리칸 리그🥨동부지구 ---</option>
              <option value="Orioles">Orioles</option>
              <option value="Red Sox">Red Sox</option>
              <option value="Yankees">Yankees</option>
              <option value="Rays">Rays</option>
              <option value="Blue Jays">Blue Jays</option>
              <option value="">--- 아메리칸 리그🥨중부지구 ---</option>
              <option value="Sox">White Sox</option>
              <option value="Guardians">Guardians</option>
              <option value="Tigers">Tigers</option>
              <option value="Royals">Royals</option>
              <option value="Twins">Twins</option>
              <option value="">--- 아메리칸 리그🥨서부지구 ---</option>
              <option value="Astros">Astros</option>
              <option value="Angels">Angels</option>
              <option value="Athletics">Athletics</option>
              <option value="Mariners">Mariners</option>
              <option value="Rangers">Rangers</option>
              <option value="">--- 내셔널 리그🥨동부지구 ---</option>
              <option value="Braves">Braves</option>
              <option value="Marlins">Marlins</option>
              <option value="Mets">Mets</option>
              <option value="Phillies">Phillies</option>
              <option value="Nationals">Nationals</option>
              <option value="">--- 내셔널 리그🥨중부지구 ---</option>
              <option value="Cubs">Cubs</option>
              <option value="Reds">Reds</option>
              <option value="Brewers">Brewers</option>
              <option value="Pirates">Pirates</option>
              <option value="Cardinals">Cardinals</option>
              <option value="">--- 내셔널 리그🥨서부지구 ---</option>
              <option value="Diamondbacks">Diamondbacks</option>
              <option value="Rockies">Rockies</option>
              <option value="Dodgers">Dodgers</option>
              <option value="Padres">Padres</option>
              <option value="Giants">Giants</option>
            </select>
          </div>
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
              <td>
                <img :src="captain.$.img" :alt="captain.$.name" class="pb-1" style="width: 55px" />
              </td>
              <td>
                <RouterLink
                  :to="{
                    name: 'Items',
                    state: {
                      searchParams: {
                        uuid: captain.$.uuid,
                        name: captain.$.name,
                        boosts: JSON.stringify(captain.$.boosts),
                        team: captain.$.team,
                        ability_name: captain.$.ability_name,
                      },
                    },
                  }"
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
          <button @click="inquiryCaptains('M')" type="button" class="btn btn-primary btn-lg">더보기</button>
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
 * 팀 조건 조회
 */
const inquiryTeams = (event) => {
  let teams = event.target.value

  if (teams) {
    inquiryCaptains('I', null, teams)
  }
}

/**
 * 캡틴 목록 조회
 */
const inquiryCaptains = async (mode) => {
  //페이지 증가
  if (mode === 'I') {
    captains.splice(0)
    page = 1
  } else {
    page = page + 1
  }

  //선택한 포지션
  let ability = document.querySelectorAll('input[name="ability"]:checked')
  ability = ability.length ? ability[0].value : ''
  //선택한 팀
  let team = document.querySelectorAll('select[class="form-select"] > option:checked')
  team = team.length ? team[0].value : ''

  //타이틀
  title.value = ability ? ability : '전체'

  //파라미터
  const params = {
    page: page,
    ability: ability ? ability : 'Cornerstone',
    team: team,
  }

  //API 호출
  //?page=${page}&ability=${selectedAbilities}&team=${team}
  const res = await fetch(`/api/db/captains`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
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
  inquiryCaptains('I')
})
</script>

<style></style>
