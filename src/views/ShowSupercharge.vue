<template>
  <div class="py-5">
    <div class="container">
      <MenuHeader />

      <div class="py-5">
        <h1 class="font-bold text-transparent tracking-tight max-w-2xl text-7xl">
          <span class="inline-block bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"
            >MLB 더 쇼 24<br />과급 선수 총 {{ total }} 선수</span
          >
        </h1>
      </div>

      <div class="d-grid gap-2 d-md-block py-5">
        <template v-for="(item, index) in items" :key="item.$.uuid">
          <div class="row py-3" style="border-bottom: 1px solid #000000">
            <div class="col-2">
              <img :src="item.$.baked_img" class="rounded d-block" :alt="item.$.name" style="width: 150px" />
              <div class="fs-3">#{{ index + 1 }}</div>
              <div class="fs-3">Set {{ item.$.set_name }}</div>
              <div class="fs-3">{{ item.$.series }}</div>
            </div>
            <div class="col fs-5 fw-bold">
              <!-- STR: 선수 이름 -->
              <div class="mb-2">
                {{ item.$.jersey_number }} {{ item.$.display_position }} {{ item.$.name }}
                <a :href="`https://mlb24.theshow.com/items/${item.$.uuid}`" class="ps-3" target="blank">🚀</a>
              </div>
              <!-- END: 선수 이름 -->

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

              <div class="row py-2">
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

              <div class="row pt-2">
                <div class="col">
                  <img
                    src="https://mlb24.theshow.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCRGZLRFJNPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--d29b22371818894f00b3913c1c5a5e2781786b66/supercharged_icon.webp"
                    class="rounded float-start me-3 mb-1"
                    style="width: 40px"
                  />
                  <div class="fs-8">{{ moment(item.$.augment_end_date).format('YYYY.MM.DD hh:mm:ss') }}</div>
                  <div class="text-muted fs-8">{{ item.$.augment_text }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'
import moment from 'moment'

//총 건수
let total = ref(0)

//아이템
const items = reactive([])

//캡틴 별 부스트 적용 값
const calcBoost = (type, value) => {
  let result = value

  return result
}

/**
 * 과급 선수 정보 조회
 */
const inquirySupercharge = async () => {
  //API 호출
  const res = await fetch(`/api/db/supercharge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  //응답
  const result = await res.json()

  //총 건수
  total.value = result.length

  //목록
  items.push(...result)
}

/**
 * 컴포넌트 마운트
 */
onMounted(async () => {
  inquirySupercharge()
})
</script>
