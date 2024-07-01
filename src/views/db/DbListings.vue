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
                  <th scope="col">Overall</th>
                  <th scope="col">Buy Now</th>
                  <th scope="col">Sell Now</th>
                  <th scope="col">Pos</th>
                  <th scope="col">Team</th>
                  <th scope="col">Set</th>
                  <th scope="col">Series</th>
                </tr>
              </thead>
              <tbody class="table-group-divider">
                <template v-for="(item, index) in items" :key="item.uuid">
                  <tr class="align-middle">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      <img :src="item.img" class="img-fluid" :alt="item.name" style="width: 48px" />
                    </td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.ovr }}</td>
                    <td>{{ item.buy }}</td>
                    <td>{{ item.sell }}</td>
                    <td>{{ item.position }}</td>
                    <td>{{ item.team }}</td>
                    <td>{{ item.set }}</td>
                    <td>{{ item.series }}</td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 my-5 col-3 mx-auto">
        <button v-show="more" @click="inquiryListings('M')" type="button" class="btn btn-primary">
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
const inquiryListings = async (mode) => {
  //페이지 증가
  if (mode === 'I') {
    page = 1
  } else {
    page = page + 1
  }

  //API 호출
  const res = await fetch(`/api/db/listings?page=${page}`)
  //응답
  const data = await res.json()

  //응답
  items.push(...data)
}

/**
 * 컴포넌트 마운트
 */
onMounted(async () => {
  inquiryListings('I')
})
</script>

<style>
.table {
  font-size: 14px;
}
</style>
