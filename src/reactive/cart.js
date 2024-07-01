import { reactive } from 'vue'
import { DateTime } from 'luxon'

const now = DateTime.now().setZone('Asia/Taipei')
const sysNow = now.hour>=13 ? now.plus({days: 1}) : now

export const cart = reactive([])
export const selectedDay = reactive({
    day: sysNow
})