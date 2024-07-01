<template>
  <div class="py-5">
    <div class="container">
      <header class="pb-5">
        <nav class="nav nav-pills flex-column flex-sm-row">
          <RouterLink
            :to="{ name: 'Captains' }"
            class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold"
            >캡틴 능력치</RouterLink
          >
          <RouterLink
            :to="{ name: 'Items' }"
            class="flex-sm-fill text-sm-center nav-link fs-5 fw-bold active"
            >캡틴 대상 선수</RouterLink
          >
        </nav>
      </header>

      <div>
        <h1 class="font-bold text-transparent tracking-tight max-w-2xl text-7xl">
          <span class="inline-block bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"
            >MLB 더 쇼 24<br />`{{ captain }}` 총 {{ total }} 선수</span
          >
        </h1>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <template v-for="(position, index) in positions" :key="position">
            <input
              @click="inquiryItems('I', `${position}`)"
              type="radio"
              class="btn-check"
              name="btnradio"
              :id="`btnradio${index}`"
              autocomplete="off"
            />
            <label
              :class="`btn btn-outline-${index > 7 ? 'danger' : 'primary'}`"
              :for="`btnradio${index}`"
              >{{ position }}</label
            >
          </template>
        </div>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <template v-for="(item, index) in items" :key="item.$.uuid">
          <div class="row py-3" style="border-bottom: 1px solid #000000">
            <div class="col-2">
              <img
                :src="item.$.baked_img"
                class="rounded d-block"
                :alt="item.$.name"
                style="width: 150px"
              />
              <span class="fs-3">#{{ index + 1 }}</span>
            </div>
            <div class="col fs-5 fw-bold">
              <!-- STR: 선수 이름 -->
              <div class="mb-2">
                {{ item.$.jersey_number }} {{ item.$.display_position }}
                {{ item.$.name }}
              </div>
              <!-- END: 선수 이름 -->

              <div class="row mb-3">
                <div class="col">
                  <!-- STR: 일반 정보 -->
                  <div class="row mb-1">
                    <div class="col">
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Overall</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.ovr }}
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Bats</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.bat_hand }}
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Throws</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.throw_hand }}
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Secondary</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.display_secondary_positions }}&nbsp;
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Weight</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.weight }}
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Height</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.height }}
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
                        <button type="button" class="btn btn-secondary fs-8">Age</button>
                        <button type="button" class="btn btn-outline-dark fs-8">
                          {{ item.$.age }}
                        </button>
                      </div>
                      <div
                        class="btn-group-vertical btn-group-sm me-1"
                        role="group"
                        aria-label="Small button group"
                      >
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
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-primary fs-8">CON R</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('CON R', item.$.contact_right) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-primary fs-8">CON L</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('CON L', item.$.contact_left) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-primary fs-8">POW R</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('POW R', item.$.power_right) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-primary fs-8">POW L</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('POW L', item.$.power_left) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-primary fs-8">VIS</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('VIS', item.$.plate_vision) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-primary fs-8">CLT</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('CLT', item.$.batting_clutch) }}
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
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">STA</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('STA', item.$.stamina) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">H/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('H/9', item.$.hits_per_bf) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">K/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('K/9', item.$.k_per_bf) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">BB/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('BB/9', item.$.bb_per_bf) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">HR/9</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('HR/9', item.$.hr_per_bf) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">PCLT</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('PCLT', item.$.pitching_clutch) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">CTRL</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('CTRL', item.$.pitch_control) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">VEL</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('VEL', item.$.pitch_velocity) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-danger fs-8">BRK</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('BRK', item.$.pitch_movement) }}
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
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-success fs-8">FLD</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('FLD', item.$.fielding_ability) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-success fs-8">ARM</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('ARM', item.$.arm_strength) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-success fs-8">ACC</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('ACC', item.$.arm_accuracy) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-success fs-8">REAC</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('REAC', item.$.reaction_time) }}
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
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-warning fs-8">SPD</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('SPD', item.$.speed) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-warning fs-8">STEAL</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('STEAL', item.$.baserunning_ability) }}
                          </button>
                        </div>
                        <div
                          class="btn-group-vertical btn-group-sm me-1"
                          role="group"
                          aria-label="Small button group"
                        >
                          <button type="button" class="btn btn-warning fs-8">BR AGG</button>
                          <button type="button" class="btn btn-outline-dark fs-8">
                            {{ calcBoost('BR AGG', item.$.baserunning_aggression) }}
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

              <div class="row pt-2">
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
            </div>
          </div>
        </template>
      </div>

      <template v-if="more">
        <div class="d-grid py-5">
          <button @click="inquiryItems('M')" type="button" class="btn btn-primary btn-lg">
            더보기
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'

//검색 파라미터
let { searchParams } = history.state
let uuid = searchParams ? searchParams.uuid : '239a08b036996af21be91c28f8b985cb'

//페이지
let page = 0

//총 건수
let total = ref(0)

//더보기
let more = ref(false)

//캡틴
let captain = ref(null)

if (!searchParams) {
  captain.value = 'Rafael Devers'
} else {
  if (searchParams.uuid === '239a08b036996af21be91c28f8b985cb') {
    captain.value = 'Rafael Devers'
  } else if (searchParams.uuid === '99cc0385e7170c6ee7a2cf202d3bbe42') {
    captain.value = 'Nolan Arenado'
  } else if (searchParams.uuid === '93fe5dc2e734e7754d0c7799bc091c7d') {
    captain.value = 'Byron Buxton'
  } else if (searchParams.uuid === '153cdc73ee95d7e2da41340d552d1370') {
    captain.value = 'Giancarlo Stanton'
  } else if (searchParams.uuid === '8ef723b96a42952c7a4769a9231b79b3') {
    captain.value = 'Corbin Carroll'
  } else if (searchParams.uuid === '5f6abd385d99e9f508320ab4cca07f28') {
    captain.value = 'Luis Castillo'
  } else if (searchParams.uuid === 'a03aad508e99fc341087a8b9ec12c053') {
    captain.value = 'Kodai Senga'
  } else if (searchParams.uuid === 'e88a994b60847fd3f5bf29ddce531b13') {
    captain.value = 'Greg Maddux'
  } else if (searchParams.uuid === 'f91e35ca467d4be2e5b72fb20f9e2ca4') {
    captain.value = 'David Ortiz'
  }
}

//포지션 필터
const positions = ['C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'SP', 'RP', 'CP']

//아이템
const items = reactive([])

//캡틴 별 부스트 적용 값
const calcBoost = (type, value) => {
  let result = value
  let boost

  if (captain.value === 'Rafael Devers') {
    switch (type) {
      case 'POW R':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'POW L':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'VIS':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
      case 'CLT':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
    }
  } else if (captain.value === 'Nolan Arenado') {
    switch (type) {
      case 'CON R':
        boost = value * 1 + 20 > 125 ? 125 : value * 1 + 20
        result = `${value}⇢${boost}`
        break
      case 'POW L':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'CLT':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'FLD':
        boost = value * 1 + 10 > 125 ? 125 : value * 1 + 10
        result = `${value}⇢${boost}`
        break
    }
  } else if (captain.value === 'Giancarlo Stanton') {
    switch (type) {
      case 'POW R':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'POW L':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'CLT':
        boost = value * 1 + 10 > 125 ? 125 : value * 1 + 10
        result = `${value}⇢${boost}`
        break
    }
  } else if (captain.value === 'Luis Castillo') {
    switch (type) {
      case 'CON R':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'CON L':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'H/9':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
      case 'BB/9':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
    }
  } else if (captain.value === 'Corbin Carroll') {
    switch (type) {
      case 'CON R':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'CON L':
        boost = value * 1 + 15 > 125 ? 125 : value * 1 + 15
        result = `${value}⇢${boost}`
        break
      case 'VIS':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
      case 'REAC':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
    }
  } else if (captain.value === 'Byron Buxton') {
    switch (type) {
      case 'POW R':
        boost = value * 1 + 12 > 125 ? 125 : value * 1 + 12
        result = `${value}⇢${boost}`
        break
      case 'POW L':
        boost = value * 1 + 10 > 125 ? 125 : value * 1 + 10
        result = `${value}⇢${boost}`
        break
      case 'SPD':
        boost = value * 1 + 3 > 125 ? 125 : value * 1 + 3
        result = `${value}⇢${boost}`
        break
      case 'FLD':
        boost = value * 1 + 5 > 125 ? 125 : value * 1 + 5
        result = `${value}⇢${boost}`
        break
    }
  }

  return result
}

/**
 * 아이템 목록 조회
 */
const inquiryItems = async (mode, position) => {
  //페이지 증가
  if (mode === 'I') {
    items.splice(0)
    page = 1
  } else {
    page = page + 1
  }

  //API 호출
  const res = await fetch(`/api/db/items/${uuid}?page=${page}&pos=${position}`)
  //응답
  const result = await res.json()

  //총 건수
  total.value = result.total

  //목록
  items.push(...result.items)

  //더보기
  if (total.value > page * 25) more.value = true
  else more.value = false
}

/**
 * 컴포넌트 마운트
 */
onMounted(async () => {
  inquiryItems('I')
})
</script>
