import React from 'react'
import { List } from '../List'
import { ListItem } from '../ListItem'
import LoadingIndicator from '@/components/ui/LoadingIndicator'

interface ReposListProps {
  loading: boolean
  error: any
  repos: any
}

export const ReposList = ({ loading, error, repos }: ReposListProps) => {
  if (loading) {
    return <List component={LoadingIndicator} />
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item="Something went wrong, please try again!" />
    )
    return <List component={ErrorComponent} />
  }

  if (repos !== false) {
    return <List items={repos} component={null} />
  }

  return null
}
