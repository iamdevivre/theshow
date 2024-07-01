<template>
  <MenuHeader />

  <main>
    <MenuNav />

    <div class="py-5 bg-body-tertiary">
      <div class="container">
        <div class="row">
          <div class="table-responsive">
            <table class="table table-hover">
              <thead class="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col"></th>
                  <th scope="col">Player</th>
                  <th scope="col">Ovr</th>
                  <th scope="col">Pos</th>
                  <th scope="col">Team</th>
                  <th scope="col">Ability</th>
                  <th scope="col">Tier1</th>
                  <th scope="col">Tier2</th>
                  <th scope="col">Tier3</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <template v-for="(item, index) in items" :key="item.uuid">
                  <tr class="align-middle">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      <img :src="item.img" class="img-fluid" :alt="item.name" />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.ovr }}</td>
                    <td>{{ item.position }}</td>
                    <td>{{ item.team }}</td>
                    <td>
                      <p>{{ item.ability_name }}</p>
                      <small class="text-muted">{{ item.ability_desc }}</small>
                    </td>
                    <td>
                      <p>{{ item.tier1_desc }}</p>
                      <small class="text-muted">
                        {{ item.tier1_attr1_name }} {{ item.tier1_attr1_value }}<br />
                        {{ item.tier1_attr2_name }} {{ item.tier1_attr2_value }}<br />
                        {{ item.tier1_attr3_name }} {{ item.tier1_attr3_value }}<br />
                        {{ item.tier1_attr4_name }} {{ item.tier1_attr4_value }}
                      </small>
                    </td>
                    <td>
                      <p>{{ item.tier2_desc }}</p>
                      <small class="text-muted">
                        {{ item.tier2_attr1_name }} {{ item.tier2_attr1_value }}<br />
                        {{ item.tier2_attr2_name }} {{ item.tier2_attr2_value }}<br />
                        {{ item.tier2_attr3_name }} {{ item.tier2_attr3_value }}<br />
                        {{ item.tier2_attr4_name }} {{ item.tier2_attr4_value }}
                      </small>
                    </td>
                    <td>
                      <p>{{ item.tier3_desc }}</p>
                      <small class="text-muted">
                        {{ item.tier3_attr1_name }} {{ item.tier3_attr1_value }}<br />
                        {{ item.tier3_attr2_name }} {{ item.tier3_attr2_value }}<br />
                        {{ item.tier3_attr3_name }} {{ item.tier3_attr3_value }}<br />
                        {{ item.tier3_attr4_name }} {{ item.tier3_attr4_value }}
                      </small>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 my-5 col-3 mx-auto">
        <button v-show="more" @click="inquiryCaptains('M')" type="button" class="btn btn-primary">
          더보기 ({{ current }} / {{ total }})
        </button>
      </div>
    </div>
  </main>

  <MenuFooter />
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import MenuHeader from '@/components/MenuHeader.vue'
import MenuNav from '@/components/MenuNav.vue'
import MenuFooter from '@/components/MenuFooter.vue'

//페이지
let page = 0

//현재 카운드 = 0
let current = 0

//전체 카운트
let total = 0

//더보기
let more = false

//아이템
const items = reactive([])

/**
 * 캡틴 목록 조회
 */
const inquiryCaptains = async (mode) => {
  //페이지 증가
  if (mode === 'I') {
    page = 1
  } else {
    page = page + 1
  }

  //API 호출
  const res = await fetch(`/api/db/captains?page=${page}`)
  //응답
  const data = await res.json()

  //응답
  items.push(...data)
}

/**
 * 컴포넌트 마운트
 */
onMounted(async () => {
  inquiryCaptains('I')
})
</script>

<style>
.table {
  font-size: 14px;
}
</style>
