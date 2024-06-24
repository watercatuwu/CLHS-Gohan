import { supabase } from '@/supabase'

export const getUserAvatar = async () => {
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    const {data:{avatar}} = await supabase
      .from('users')
      .select('avatar')
      .eq('uuid', userData.auth.id)
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