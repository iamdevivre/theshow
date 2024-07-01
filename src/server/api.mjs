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
  connectionLimit: 5
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
 * DB: 캡틴 조회
 */
app.get('/api/db/captains', async (req, res) => {
  let conn
  let rows
  let where

  let result = { total: 0, captains: [] }

  const page = req.query.page
  const ability = req.query.ability

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

    rows = await conn.query({
      sql: `SELECT count(*) as num FROM captains WHERE 1=1 ${where}`,
      bigIntAsNumber: true
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
 * DB: 아이템 조회
 */
app.get('/api/db/items/:uuid', async (req, res) => {
  let conn
  let rows
  let where

  let result = { total: 0, items: [] }

  const page = req.query.page
  const pos = req.query.pos

  try {
    conn = await pool.getConnection()

    const uuid = req.params.uuid

    if (uuid === '153cdc73ee95d7e2da41340d552d1370') {
      //Giancarlo Stanton
      where = `
        AND JSON_VALUE(DATA, '$.series_year') BETWEEN 2010 AND 2019
        AND JSON_VALUE(DATA, '$.is_hitter') = TRUE
        AND JSON_VALUE(DATA, '$.set_name') = '2'`
    } else if (uuid === '239a08b036996af21be91c28f8b985cb') {
      //Rafael Devers
      where = `
        AND JSON_VALUE(DATA, '$.fielding_ability') <= 74
        AND JSON_VALUE(DATA, '$.is_hitter') = TRUE
        AND JSON_VALUE(DATA, '$.set_name') = '2'`
    } else if (uuid === '5f6abd385d99e9f508320ab4cca07f28') {
      //Luis Castillo
      where = `
        AND JSON_VALUE(DATA, '$.series') = 'Live'`
    } else if (uuid === '8ef723b96a42952c7a4769a9231b79b3') {
      //Corbin Carroll
      where = `
        AND JSON_VALUE(DATA, '$.speed') > 84
        AND JSON_VALUE(DATA, '$.set_name') = '2'`
    } else if (uuid === '93fe5dc2e734e7754d0c7799bc091c7d') {
      //Byron Buxton
      where = `
        AND JSON_VALUE(DATA, '$.plate_vision') < 60
        AND JSON_VALUE(DATA, '$.set_name') = '2'`
    }

    //포지션
    if (pos != 'undefined') {
      where =
        where +
        `
        AND JSON_VALUE(DATA, '$.display_position') = '${pos}'
      `
    }

    rows = await conn.query({
      sql: `SELECT count(*) as num FROM items WHERE 1=1 ${where}`,
      bigIntAsNumber: true
    })

    result.total = rows[0].num

    rows = await conn.query(`
      SELECT CASE
              WHEN JSON_VALUE(DATA, '$.is_hitter') THEN FALSE
              WHEN JSON_VALUE(DATA, '$.display_secondary_positions') != '' THEN TRUE
              ELSE FALSE
            END AS "two_way",
            JSON_QUERY(DATA, '$') AS "$"
      FROM items
      WHERE 1=1
        ${where}
      ORDER BY JSON_VALUE(DATA, '$.display_position'), JSON_VALUE(DATA, '$.ovr') DESC
      LIMIT ${(page - 1) * 25}, 25`)

    result.items.push(...rows)
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(result)
})

/**
 * DB: 리스팅 조회
 */
app.get('/api/db/listings', async (req, res) => {
  let conn
  let rows

  try {
    conn = await pool.getConnection()

    rows = await conn.query(`
      SELECT
        uuid,
        JSON_VALUE(DATA, '$.item.baked_img') AS img,
        JSON_VALUE(DATA, '$.listing_name') AS "name",
        JSON_VALUE(DATA, '$.item.ovr') AS ovr,
        JSON_VALUE(DATA, '$.best_buy_price') AS buy,
        JSON_VALUE(DATA, '$.best_sell_price') AS sell,
        JSON_VALUE(DATA, '$.item.display_position') AS "position",
        JSON_VALUE(DATA, '$.item.team') AS team,
        JSON_VALUE(DATA, '$.item.set_name') AS "set",
	      JSON_VALUE(DATA, '$.item.series') AS "series"
      FROM
        listings`)
  } finally {
    if (conn) conn.release() //release to pool
  }

  res.send(rows)
})

/**
 * API: 캡틴 입력
 */
app.get('/api/captains', async (req, res) => {
  let data = null

  try {
    for (let i = 1; i <= 4; i++) {
      const url = `https://mlb24.theshow.com/apis/captains.json?page=${i}`
      data = await call(url)
      await insertCaptions(data.captains)
    }
  } catch (err) {
    console.error(err)
  }

  res.send(data)
})

/**
 * API: 리스팅 입력
 */
app.get('/api/listings', async (req, res) => {
  let data = null

  try {
    for (let i = 1; i <= 92; i++) {
      const url = `https://mlb24.theshow.com/apis/listings.json?type=mlb_card&page=${i}`
      data = await call(url)
      await insertListings(data.listings)
    }
  } catch (err) {
    console.error(err)
  }

  res.send(data)
})

/**
 * API: 아이템 입력
 */
app.get('/api/items', async (req, res) => {
  let data = null

  try {
    for (let i = 1; i <= 109; i++) {
      const url = `https://mlb24.theshow.com/apis/items.json?type=mlb_card&page=${i}`
      data = await call(url)
      await insertItems(data.items)
    }
  } catch (err) {
    console.error(err)
  }

  res.send(data)
})
