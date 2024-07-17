import { supabase } from '@/supabase'
import { DateTime } from 'luxon'

export const getUserAvatar = async (uuid=null) => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const userid = uuid || userData.auth.id
    const {data:{avatar}} = await supabase
      .from('users')
      .select('avatar')
      .eq('uuid', userid)
      .single()

    if (avatar===null) {
      return null
    }

    const { data: { publicUrl }, error } = await supabase
      .storage
      .from('avatars')
      .getPublicUrl(avatar)

    return publicUrl
}

export const getFriend = async() => {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const {data:friendships,error:friendshipsError} = await supabase
    .from('friendships')
    .select('frienduser_id')
    .eq('user_id', userData.auth.id)

  if (friendshipsError){
    console.log(friendshipsError)
    return
  }
  const friendUUIDs = friendships.map(friendship => friendship.frienduser_id);

  const { data:friendshipsUsers, error:friendshipsUsersError } = await supabase
    .from('users')
    .select()
    .in('uuid', friendUUIDs)

  if(friendshipsUsersError){
    console.log(friendshipsUsersError)
    return
  }

  for (const friend of friendshipsUsers) {
    if (friend.avatar !== null) {
      friend.avatarurl = await getUserAvatar(friend.uuid);
    }
  }
  return friendshipsUsers
}

export const getFriendOrders = async() => {
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  const now = DateTime.now().setZone('Asia/Taipei')
  const prevweek = now.minus({ days: 3 })
  const nextweek = now.plus({ days: 5 })

  const {data:friendships,error:friendshipsError} = await supabase
    .from('friendships')
    .select('frienduser_id')
    .eq('user_id', userData.auth.id)

  if (friendshipsError){
    console.log(friendshipsError)
    return
  }
  const friendUUIDs = friendships.map(friendship => friendship.frienduser_id);

  const { data:friendshipsOrders, error:friendshipsOrdersError } = await supabase
    .from('orders')
    .select()
    .in('uuid', friendUUIDs)
    .lte('date', nextweek.toISODate())
    .gt('date', prevweek.toISODate())
    .order('date', { ascending: false })

  if(friendshipsOrdersError){
    console.log(friendshipsOrdersError)
    return
  }

  return friendshipsOrders
}