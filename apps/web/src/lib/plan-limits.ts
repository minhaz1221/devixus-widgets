import { createAdminClient } from './supabase/admin'

export async function getUserPlan(userId: string) {
  const supabase = createAdminClient()

  const { data } = await supabase
    .from('subscriptions')
    .select('plans(*)')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (!data) {
    const { data: freePlan } = await supabase
      .from('plans')
      .select('*')
      .eq('name', 'free')
      .single()
    return freePlan
  }

  return (data as any).plans
}

export async function canCreateWidget(userId: string): Promise<boolean> {
  const supabase = createAdminClient()
  const plan = await getUserPlan(userId)

  if (!plan) return false
  if (plan.widget_limit === -1) return true

  const { count } = await supabase
    .from('widgets')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('is_active', true)

  return (count ?? 0) < plan.widget_limit
}
