import { useRouter } from 'next/router'

const TasksPage = props => {
  const router = useRouter()

  router.replace('/freelancer/tasks/1')

  return null
}

export default TasksPage
