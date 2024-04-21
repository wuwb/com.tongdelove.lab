import axios from '@/utils/axios'

export async function getRencentTasks() {
  const { data } = await axios.get('/freelancer/tasks')

  return data.data
}
