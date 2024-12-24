<template>
  <div class="py-5">
    <div class="container">
      <MenuHeader />

      <div class="py-5">
        <h1 class="font-bold text-transparent tracking-tight max-w-2xl text-7xl">
          <span class="inline-block bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"
            >MLB 더 쇼 24<br />`{{ title }}` 총 {{ total }} 선수</span
          >
        </h1>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <div class="row">
          <div class="col">
            <div class="btn-group" role="group" aria-label="Postion">
              <template v-for="(position, index) in positions" :key="position">
                <input
                  @click="inquiryItems('I')"
                  type="radio"
                  class="btn-check btn-check-position"
                  name="btnposition"
                  :id="`btnposition${index}`"
                  :value="position"
                  autocomplete="off"
                />
                <label :class="`btn btn-outline-${index > 7 ? 'danger' : 'primary'}`" :for="`btnposition${index}`">{{
                  position
                }}</label>
              </template>
            </div>
          </div>
          <div class="col">
            <div class="btn-group" role="group" aria-label="Set">
              <template v-for="(set, index) in sets" :key="set">
                <input
                  @click="inquiryItems('I')"
                  type="radio"
                  class="btn-check btn-check-set"
                  name="btnset"
                  :id="`btnset${index}`"
                  :value="set"
                  autocomplete="off"
                />
                <label :class="`btn btn-outline-dark`" :for="`btnset${index}`">{{ set }}</label>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="d-grid gap-2 d-md-block pt-3 ps-3 pe-3 bg-success rounded-3 text-white">
        <template v-for="tier in tiers" :key="tier.tier">
          <p class="fs-5">{{ tier.description }}</p>
          <div class="pb-3">
            <template v-for="attribute in tier.attributes" :key="attribute.name">
              <span class="fs-5 fw-bold pe-3">{{ attribute.name }}</span>
              <span class="fs-5 pe-5">{{ attribute.value }}💨</span>
            </template>
          </div>
        </template>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <template v-for="(item, index) in items" :key="item.uuid">
          <div class="row py-3" style="border-bottom: 1px solid #000000">
            <div class="col-2">
              <img :src="item.$.baked_img" class="rounded d-block" :alt="item.$.name" style="width: 150px" />
              <div class="fs-3">Set {{ item.$.set_name }}</div>
              <div class="fs-3">{{ item.$.series }}</div>
              <template v-if="item.$.is_sellable">
                <!-- STR: 마켓 정보 -->
                <div class="fs-3">매도 {{ item.market?.best_sell_price.toLocaleString() }}</div>
                <div class="fs-3">매수 {{ item.market?.best_buy_price.toLocaleString() }}</div>
                <!-- END: 마켓 정보 -->
              </template>
            </div>
            <div class="col fs-5 fw-bold">
              <!-- STR: 선수 기존 정보 -->
              <div class="mb-2">
                #{{ item.$.jersey_number }} {{ item.$.display_position }} {{ item.$.name }}
                <a :href="`https://mlb24.theshow.com/items/${item.$.uuid}`" class="ps-3" target="blank">🚀</a>
              </div>
              <!-- END: 선수 기본 정보 -->

              <div class="row mb-3">
                <div class="col">
                  <!-- STR: 일반 정보 -->
                  <div class="row mb-1">
                    <div class="col">
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Overall</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.ovr }}
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Bats</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.bat_hand }}
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Throws</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.throw_hand }}
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Secondary</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.display_secondary_positions }}&nbsp;
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Weight</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.weight }}
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Height</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.height }}
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Age</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.age }}
                        </button>
                      </div>
                      <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                        <button type="button" class="btn btn-secondary fs-8">Born</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.born }}
                        </button>
                      </div>
                    </div>
                  </div>
                  <!-- END: 일반 정보 -->
                  <template v-if="item.two_way == '1' || item.$.is_hitter == '1'">
                    <!-- STR: 타격 정보 -->
                    <div class="row mb-1">
                      <div class="col">
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary fs-8">CON R</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Contact vs R', item.$.contact_right) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary fs-8">CON L</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Contact vs L', item.$.contact_left) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary fs-8">POW R</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Power vs R', item.$.power_right) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary fs-8">POW L</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Power vs L', item.$.power_left) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary fs-8">VIS</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Plate Vision', item.$.plate_vision) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-primary fs-8">CLT</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Batting Clutch', item.$.batting_clutch) }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- END: 타격 정보 -->
                  </template>
                  <template v-if="item.two_way == '1' || item.$.is_hitter == '0'">
                    <!-- STR: 투구 정보 -->
                    <div class="row mb-1">
                      <div class="col">
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">STA</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Stamina', item.$.stamina) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">H/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Hits Per 9', item.$.hits_per_bf) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">K/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('K Per 9', item.$.k_per_bf) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">BB/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('BB Per 9', item.$.bb_per_bf) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">HR/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('HR Per 9', item.$.hr_per_bf) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">PCLT</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Pitching Clutch', item.$.pitching_clutch) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">CTRL</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Pitching Control', item.$.pitch_control) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">VEL</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Pitching Velocity', item.$.pitch_velocity) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-danger fs-8">BRK</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Pitching Movement', item.$.pitch_movement) }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- END: 투구 정보 -->
                  </template>
                  <template v-if="item.two_way == '1' || item.$.is_hitter == '1'">
                    <!-- STR: 필드 정보 -->
                    <div class="row mb-1">
                      <div class="col">
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-success fs-8">FLD</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Fielding Ability', item.$.fielding_ability) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-success fs-8">ARM</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Arm Strength', item.$.arm_strength) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-success fs-8">ACC</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Arm Accuracy', item.$.arm_accuracy) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-success fs-8">REAC</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Reaction Time', item.$.reaction_time) }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- END: 필드 정보 -->
                  </template>
                  <template v-if="item.two_way == '1' || item.$.is_hitter == '1'">
                    <!-- STR: 주루 정보 -->
                    <div class="row mb-1">
                      <div class="col">
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-warning fs-8">SPD</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Speed', item.$.speed) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-warning fs-8">STEAL</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Baserunning Ability', item.$.baserunning_ability) }}
                          </button>
                        </div>
                        <div class="btn-group-vertical btn-group-sm me-1" role="group" aria-label="Small button group">
                          <button type="button" class="btn btn-warning fs-8">BR AGG</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('Baserunning Aggression', item.$.baserunning_aggression) }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- END: 주루 정보 -->
                  </template>
                </div>

                <template v-if="item.two_way == '1' || item.$.is_hitter == '1'">
                  <!-- STR: 타자 타격/수비 정보 -->
                  <div class="col">
                    <div class="row">
                      <div class="col-4">
                        <div class="fs-6 mb-2 text-center">Hitting</div>
                        <img
                          :src="item.$.hit_rank_image"
                          class="rounded mx-auto d-block"
                          alt="Hitting"
                          style="width: 50px"
                        />
                      </div>
                      <div class="col-4">
                        <div class="fs-6 mb-2 text-center">Fielding</div>
                        <img
                          :src="item.$.fielding_rank_image"
                          class="rounded mx-auto d-block"
                          alt="Fielding"
                          style="width: 50px"
                        />
                      </div>
                    </div>
                  </div>
                  <!-- END: 타자 타격/수비 정보 -->
                </template>

                <template v-if="item.two_way == '1' || item.$.is_hitter == '0'">
                  <!-- STR: 투구 구속/무브먼트 정보 -->
                  <div class="col">
                    <div class="fs-6 mb-2 text-center">Pitch Velocity</div>
                    <template v-for="pitch in item.$.pitches" :key="pitch.name">
                      <div class="row fs-8">
                        <div class="col align-middle text-end">
                          {{ pitch.name }}
                        </div>
                        <div class="col align-middle text-center">
                          <div class="progress">
                            <div
                              class="progress-bar bg-danger"
                              role="progressbar"
                              aria-label="Pitching speed"
                              :style="`width: ${pitch.speed}%`"
                              :aria-valuenow="pitch.speed"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                        <div class="col align-middle text-start">{{ pitch.speed }}</div>
                      </div>
                    </template>

                    <div class="fs-6 my-2 text-center">Pitch Break</div>
                    <template v-for="pitch in item.$.pitches" :key="pitch.name">
                      <div class="row fs-8">
                        <div class="col align-middle text-end">
                          {{ pitch.name }}
                        </div>
                        <div class="col align-middle text-center">
                          <div class="progress">
                            <div
                              class="progress-bar bg-danger"
                              role="progressbar"
                              aria-label="Pitching speed"
                              :style="`width: ${pitch.movement}%`"
                              :aria-valuenow="pitch.movement"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                        <div class="col align-middle text-start">{{ pitch.movement }}</div>
                      </div>
                    </template>
                  </div>
                  <!-- END: 투구 구속/무브먼트 정보 -->
                </template>
              </div>

              <!-- STR: 쿼크 정보 -->
              <div class="row" :class="`item.$.is_sellable ? 'py-2' : 'pt-2'`">
                <template v-for="quirk in item.$.quirks" :key="quirk.name">
                  <div class="col-4">
                    <img
                      :src="quirk.img"
                      class="rounded float-start bg-dark me-3 mb-1"
                      :alt="quirk.name"
                      style="width: 40px"
                    />
                    <div class="fs-8">{{ quirk.name }}</div>
                    <div class="text-muted fs-8">{{ quirk.description }}</div>
                  </div>
                </template>
              </div>
              <!-- END: 쿼크 정보 -->
            </div>
          </div>
        </template>
      </div>

      <template v-if="more">
        <div class="d-grid py-5">
          <button @click="inquiryItems('M')" type="button" class="btn btn-primary btn-lg">더보기</button>
        </div>
      </template>

      <!--Bar :data="data" :options="options" /-->
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

//차트 객체 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ['January', 'February', 'March'],
  datasets: [{ label: 'Data One', backgroundColor: '#f87979', data: [40, 20, 12] }],
}
const options = {
  responsive: true,
}

//검색 파라미터
let { searchParams } = history.state
let uuid = searchParams ? searchParams.uuid : '239a08b036996af21be91c28f8b985cb'
let title = ref(searchParams ? searchParams.name : 'Rafael Devers')
let boosts = searchParams
  ? JSON.parse(searchParams.boosts)
  : [
      {
        tier: '1',
        description: '5 Hitters with under 75 Fielding on your squad',
        attributes: [
          { name: 'Power vs R', value: '5' },
          { name: 'Power vs L', value: '5' },
        ],
      },
      {
        tier: '2',
        description: '8 Hitters with under 75 Fielding on your squad',
        attributes: [
          { name: 'Power vs R', value: '10' },
          { name: 'Power vs L', value: '10' },
        ],
      },
      {
        tier: '3',
        description: '11 Hitters with under 75 Fielding on your squad',
        attributes: [
          { name: 'Power vs R', value: '15' },
          { name: 'Power vs L', value: '15' },
          { name: 'Plate Vision', value: '5' },
          { name: 'Batting Clutch', value: '5' },
        ],
      },
    ]
let team = searchParams ? searchParams.team : 'Red Sox'
let ability = searchParams ? searchParams.ability_name : 'Cornerstone'

//티어
let tiers = boosts.filter((element) => element.tier === '3')

//페이지
let page = 0

//총 건수
let total = ref(0)

//더보기
let more = ref(false)

//포지션 필터
const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'SP', 'RP', 'CP']

//셋 필터
const sets = ['CORE', '1', '2', '3']

//아이템
const items = reactive([])

//캡틴 별 부스트 적용 값
const calcBoost = (type, value) => {
  let result = value
  let boost

  //계층별
  tiers.forEach((element) => {
    //능력치별
    element.attributes.forEach((attribute) => {
      if (attribute.name === type) {
        boost = Number(value) + Number(attribute.value)
        boost = boost > 125 ? 125 : boost
        result = `${value}⇢${boost}`
      }
    })
  })

  return result
}

/**
 * 팀 캡틴 정보 조회
 */
const inquiryTeamCaptains = async () => {
  //파라미터
  const params = {
    ability: ability,
  }

  //API 호출
  const res = await fetch(`/api/db/team/captains`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  //응답
  const result = await res.json()

  //타이틀
  title.value = result[0].$.team

  //티어 초기화
  tiers.splice(0)

  result.forEach((element) => {
    tiers.push(element.$.boosts[2])
  })
}

/**
 * 아이템 목록 조회
 */
const inquiryItems = async (mode) => {
  //페이지 증가
  if (mode === 'I') {
    items.splice(0)
    page = 1
  } else {
    page = page + 1
  }

  //선택한 포지션
  let position = document.querySelectorAll('input[name="btnposition"]:checked')
  position = position.length ? position[0].value : ''
  //선택한 세트
  let set = document.querySelectorAll('input[name="btnset"]:checked')
  set = set.length ? set[0].value : ''

  //파라미터
  const params = {
    page: page,
    position: position,
    set: set,
    team: ability.includes('Team Captain') ? team : '',
  }

  //API 호출: 아이템
  let res = await fetch(`/api/db/items/${uuid}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  //응답
  let result = await res.json()

  //총 건수
  total.value = result.total

  //아이템 목록
  items.push(...result.items)

  //더보기
  if (total.value > page * 25) more.value = true
  else more.value = false
}

/**
 * 컴포넌트 마운트
 */
onMounted(async () => {
  if (ability.includes('Team Captain')) {
    inquiryTeamCaptains()
  }
  inquiryItems('I')
})
</script>
