import express from 'express'
import fetch from 'node-fetch'
import mariadb from 'mariadb'

const app = express()

app.use(express.json())

app.listen(3000, () => {
  console.log('MLB The Show API Server is listening 3000')
})

//MariaDB 연결
const pool = mariadb.createPool({
  user: 'mlb',
  password: 'show',
  host: 'localhost',
  database: 'theshowdb',
  connectionLimit: 5,
})

/**
 * http get 공통
 *
 * @param {string} url
 * @returns json 데이터 반환
 */
const call = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  return data
}

/**
 * 캡틴 데이터 입력
 */
const insertCaptions = async (data) => {
  let conn

  try {
    conn = await pool.getConnection()

    data.forEach(async (element) => {
      //값 배열
      const values = []

      values.push(element.uuid)
      values.push(JSON.stringify(element))

      await conn.query('INSERT INTO captains value (?, ?)', values)
    })
  } finally {
    if (conn) conn.release() //release to pool
  }
}

/**
 * 아이템 데이터 입력
 */
const insertItems = async (data) => {
  let conn

  try {
    conn = await pool.getConnection()

    data.forEach(async (element) => {
      //값 배열
      const values = []

      values.push(element.uuid)
      values.push(JSON.stringify(element))

      await conn.query('INSERT INTO Items value (?, ?)', values)
    })
  } finally {
    if (conn) conn.release() //release to pool
  }
}

/**
 * 리스팅 데이터 입력
 */
const insertListings = async (data) => {
  let conn

  try {
    conn = await pool.getConnection()

    data.forEach(async (element) => {
      //값 배열
      const values = []

      values.push(element.item.uuid)
      values.push(JSON.stringify(element))

      await conn.query('INSERT INTO Listings value (?, ?)', values)
    })
  } finally {
    if (conn) conn.release() //release to pool
  }
}

/**
 * DB: 캡틴 조회
 */
app.post('/api/db/captains', async (req, res) => {
  let conn
  let rows
  let where

  let data = req.body
  const page = data.page
  const ability = data.ability
  const team = data.team

  let result = { total: 0, captains: [] }

  try {
    conn = await pool.getConnection()

    if (ability === 'Cornerstone') {
      //Cornerstone
      where = `
        AND JSON_VALUE(DATA, '$.ability_name') = 'Cornerstone'`
    } else if (ability === 'Team Captain') {
      //Team Caption
      where = `
        AND JSON_VALUE(DATA, '$.ability_name') Like '%Team Captain%'`
    } else if (ability === 'Other') {
      //Other
      where = `
        AND JSON_VALUE(DATA, '$.ability_name') != 'Cornerstone'
        AND JSON_VALUE(DATA, '$.ability_name') Not Like '%Team Captain%'`
    } else {
      where = ``
    }

    //팀
    if (team) {
      where =
        where +
        `
        AND JSON_VALUE(DATA, '$.team') = '${team}'
      `
    }

    rows = await conn.query({
      sql: `SELECT count(*) as num FROM captains WHERE 1=1 ${where}`,
      bigIntAsNumber: true,
    })

    result.total = rows[0].num

    rows = await conn.query(`
      SELECT JSON_QUERY(DATA, '$') AS "$"
      FROM captains
      WHERE 1=1
        ${where}
      ORDER BY JSON_VALUE(DATA, '$.display_position'), JSON_VALUE(DATA, '$.ovr') DESC
      LIMIT ${(page - 1) * 25}, 25`)

    result.captains.push(...rows)
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(result)
})

/**
 * DB: 팀 캡틴 조회
 */
app.post('/api/db/team/captains', async (req, res) => {
  let conn
  let rows

  let data = req.body

  try {
    conn = await pool.getConnection()

    rows = await conn.query(`
      SELECT JSON_QUERY(DATA, '$') AS "$"
      FROM captains
      WHERE 1=1
        AND JSON_VALUE(DATA, '$.ability_name') = '${data.ability}'
      ORDER BY JSON_VALUE(DATA, '$.ovr') DESC, JSON_VALUE(DATA, '$.display_position')`)
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(rows)
})

/**
 * DB: 아이템 조회
 */
app.post('/api/db/items/:uuid', async (req, res) => {
  let conn
  let rows
  let where

  let data = req.body
  const page = data.page
  const position = data.position
  const set = data.set
  const team = data.team

  let result = { total: 0, items: [] }

  try {
    conn = await pool.getConnection()

    const uuid = req.params.uuid

    if (uuid === '239a08b036996af21be91c28f8b985cb') {
      //Rafael Devers
      where = `
        AND JSON_VALUE(A.DATA, '$.fielding_ability') <= 74
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === '99cc0385e7170c6ee7a2cf202d3bbe42') {
      //Nolan Arenado
      where = `
        AND JSON_VALUE(A.DATA, '$.speed') < 45
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === '93fe5dc2e734e7754d0c7799bc091c7d') {
      //Byron Buxton
      where = `
        AND JSON_VALUE(A.DATA, '$.plate_vision') < 60
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === '153cdc73ee95d7e2da41340d552d1370') {
      //Giancarlo Stanton
      where = `
        AND JSON_VALUE(A.DATA, '$.series_year') BETWEEN 2010 AND 2019
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === '8ef723b96a42952c7a4769a9231b79b3') {
      //Corbin Carroll
      where = `
        AND JSON_VALUE(A.DATA, '$.speed') > 84
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === '5f6abd385d99e9f508320ab4cca07f28') {
      //Luis Castillo
      where = `
        AND JSON_VALUE(A.DATA, '$.series') = 'Live'`
    } else if (uuid === 'a03aad508e99fc341087a8b9ec12c053') {
      //Kodai Senga
      where = `
        AND JSON_VALUE(A.DATA, '$.bb_per_bf') < 65
        AND JSON_VALUE(A.DATA, '$.is_hitter') = FALSE`
    } else if (uuid === 'e88a994b60847fd3f5bf29ddce531b13') {
      //Greg Maddux
      where = `
        AND (
              (JSON_VALUE(A.DATA, '$.is_hitter') = 1 AND JSON_VALUE(A.DATA, '$.power_right') < 70)
              OR
              (JSON_VALUE(A.DATA, '$.is_hitter') = 0 AND JSON_VALUE(A.DATA, '$.k_per_bf') < 75)
            )`
    } else if (uuid === 'f91e35ca467d4be2e5b72fb20f9e2ca4') {
      //David Ortiz
      where = `
        AND JSON_VALUE(A.DATA, '$.series_year') BETWEEN 2000 AND 2009
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === 'cdec5b1983e3acf95ea01fde0e07c9b3') {
      //Carlos Santana
      where = `
        AND JSON_VALUE(A.DATA, '$.bat_hand') = 'S'`
    } else if (uuid === 'ec9b2c4699c82367a388b3d5dda3dd82') {
      //Elias Díaz
      where = `
        AND JSON_VALUE(A.DATA, '$.series') IN ('All-Star', 'All-Star Game', 'Home Run Derby')`
    } else if (uuid === 'e362695a8a652bf7ba58af7bcb2559cf') {
      //Max Muncy
      where = `
        AND JSON_VALUE(A.DATA, '$.series') IN ('Season Awards', 'Topps Now')`
    } else if (uuid === '663733c750ec092c7b6ee5fcf018868a') {
      //Mark Prior
      where = `
        AND JSON_VALUE(A.DATA, '$.series') IN ('Standout')`
    } else if (uuid === '8d1917f3c1c61008c42302948c2bbd60') {
      //Rube Foster
      where = `
        AND JSON_VALUE(A.DATA, '$.series') IN ('The Negro Leagues')`
    } else if (uuid === '6af208a28000cae06e5b71947691a66d') {
      //Derek Jeter
      where = `
        AND JSON_VALUE(A.DATA, '$.series') IN ('Captain')`
    } else if (uuid === '6fcc1ede3600391ae0070c857adc17d5') {
      //Oneil Cruz
      where = `
        AND JSON_VALUE(A.DATA, '$.arm_strength') >= 90
        AND JSON_VALUE(A.DATA, '$.is_hittr') = TRUE`
    } else if (uuid === '460570bbaddf1f591078eecad76cf506') {
      //Jackson Chourio
      where = `
        AND JSON_VALUE(A.DATA, '$.age') <= 23
        AND JSON_VALUE(A.DATA, '$.is_hitter') = TRUE`
    } else if (uuid === '340f03ad235dcd5ba097dcfc2a74d7a7') {
      //Joe Nathan
      where = `
        AND JSON_VALUE(A.DATA, '$.born') = 'Texas'`
    } else if (uuid === '4e7c74660fca105e4398ab0e17867537') {
      //Tim Salmon
      where = `
        AND JSON_VALUE(A.DATA, '$.born') = 'California'`
    } else if (team) {
      //Team Captain
      where = `
        AND JSON_VALUE(A.DATA, '$.team') = '${team}'`
    } else {
      where = ``
    }

    //포지션
    if (position != '') {
      where =
        where +
        `
        AND (JSON_VALUE(A.DATA, '$.display_position') = '${position}'
            OR
            FIND_IN_SET('${position}', JSON_VALUE(A.DATA, '$.display_secondary_positions')) > 0)
      `
    }

    //세트
    if (set != '') {
      where =
        where +
        `
        AND JSON_VALUE(A.DATA, '$.set_name') = '${set}'
      `
    }

    rows = await conn.query({
      sql: `SELECT count(*) as num FROM items A LEFT OUTER JOIN listings B ON A.uuid = B.uuid WHERE 1=1 ${where}`,
      bigIntAsNumber: true,
    })

    result.total = rows[0].num

    rows = await conn.query(`
      SELECT CASE
              WHEN JSON_VALUE(A.DATA, '$.is_hitter') THEN FALSE
              WHEN JSON_VALUE(A.DATA, '$.display_secondary_positions') != '' THEN TRUE
              ELSE FALSE
            END AS "two_way",
            JSON_VALUE(A.DATA, '$.uuid') AS "uuid",
            JSON_QUERY(A.DATA, '$') AS "$",
            JSON_QUERY(B.DATA, '$') AS "market"
      FROM items A
      LEFT OUTER JOIN listings B
      ON A.uuid = B.uuid
      WHERE 1=1
        ${where}
      ORDER BY JSON_VALUE(A.DATA, '$.ovr') DESC, JSON_VALUE(A.DATA, '$.display_position'), JSON_VALUE(A.DATA, '$.display_secondary_positions')
      LIMIT ${(page - 1) * 25}, 25`)

    result.items.push(...rows)
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(result)
})

/**
 * DB: 과급 선수 조회
 */
app.post('/api/db/supercharge', async (req, res) => {
  let conn
  let rows

  try {
    conn = await pool.getConnection()

    rows = await conn.query(`
      SELECT JSON_QUERY(DATA, '$') AS "$"
      FROM items
      WHERE 1=1
        AND JSON_VALUE(DATA, '$.has_augment') = TRUE
      ORDER BY JSON_VALUE(DATA, '$.ovr') DESC, JSON_VALUE(DATA, '$.display_position')`)
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(rows)
})

/**
 * API: 캡틴 데이터 초기화
 */
app.delete('/api/captains', async (req, res) => {
  let params = req.body
  let data = { success: false }
  let conn

  if (
    params.token !==
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  ) {
    data.success = false
    res.send(data)

    return
  }

  try {
    conn = await pool.getConnection()

    let result = await conn.query('TRUNCATE TABLE captains')

    data.success = true
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(data)
})

/**
 * API: 캡틴 조회
 */
app.get('/api/captains', async (req, res) => {
  let params = req.body
  let result = { totalPages: 0, success: false }

  const page = params.page

  try {
    const url = `https://mlb24.theshow.com/apis/captains.json?page=${page}`
    const data = await call(url)

    result.success = true
    result.totalPages = data.total_pages
  } catch (err) {
    console.error(err)
  }

  res.send(result)
})

/**
 * API: 캡틴 입력
 */
app.post('/api/captains', async (req, res) => {
  let params = req.body
  let result = { totalPages: 0, success: false }

  const page = params.page

  try {
    const url = `https://mlb24.theshow.com/apis/captains.json?page=${page}`
    const data = await call(url)
    await insertCaptions(data.captains)

    result.success = true
    result.totalPages = data.total_pages
  } catch (err) {
    console.error(err)
  }

  res.send(result)
})

/**
 * API: 아이템 데이터 초기화
 */
app.delete('/api/items', async (req, res) => {
  let params = req.body
  let data = { success: false }
  let conn

  if (
    params.token !==
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  ) {
    data.success = false
    res.send(data)

    return
  }

  try {
    conn = await pool.getConnection()

    let result = await conn.query('TRUNCATE TABLE items')

    data.success = true
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(data)
})

/**
 * API: 아이템 조회
 */
app.get('/api/items', async (req, res) => {
  let params = req.body
  let result = { totalPages: 0, success: false }

  const page = params.page

  try {
    const url = `https://mlb24.theshow.com/apis/items.json?page=${page}`
    const data = await call(url)

    result.success = true
    result.totalPages = data.total_pages
  } catch (err) {
    console.error(err)
  }

  res.send(result)
})

/**
 * API: 아이템 입력
 */
app.post('/api/items', async (req, res) => {
  let params = req.body
  let result = { totalPages: 0, success: false }

  const page = params.page

  try {
    const url = `https://mlb24.theshow.com/apis/items.json?page=${page}`
    const data = await call(url)
    await insertItems(data.items)

    result.success = true
    result.totalPages = data.total_pages
  } catch (err) {
    console.error(err)
  }

  res.send(result)
})

/**
 * API: 리스팅 데이터 초기화
 */
app.delete('/api/listings', async (req, res) => {
  let params = req.body
  let data = { success: false }
  let conn

  if (
    params.token !==
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  ) {
    data.success = false
    res.send(data)

    return
  }

  try {
    conn = await pool.getConnection()

    let result = await conn.query('TRUNCATE TABLE listings')

    data.success = true
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(data)
})

/**
 * API: 리스팅 조회
 */
app.get('/api/listings', async (req, res) => {
  let params = req.body
  let result = { totalPages: 0, success: false }

  const page = params.page

  try {
    const url = `https://mlb24.theshow.com/apis/listings.json?page=${page}`
    const data = await call(url)

    result.success = true
    result.totalPages = data.total_pages
  } catch (err) {
    console.error(err)
  }

  res.send(result)
})

/**
 * API: 리스팅 입력
 */
app.post('/api/listings', async (req, res) => {
  let params = req.body
  let result = { totalPages: 0, success: false }

  const page = params.page

  try {
    const url = `https://mlb24.theshow.com/apis/listings.json?page=${page}`
    const data = await call(url)
    await insertListings(data.listings)

    result.success = true
    result.totalPages = data.total_pages
  } catch (err) {
    console.error(err)
  }

  res.send(result)
})
