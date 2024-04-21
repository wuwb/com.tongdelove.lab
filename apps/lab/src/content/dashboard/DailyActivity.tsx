import * as React from 'react'
import BaseCard from '@/components/module/baseCard/BaseCard'

const activities = [
  {
    time: '09.50',
    color: 'success.main',
    text: 'Meeting with John',
  },
  {
    time: '09.46',
    color: 'secondary.main',
    text: 'Payment received from John Doe of $385.90',
  },
  {
    time: '09.47',
    color: 'primary.main',
    text: 'Project Meeting',
  },
  {
    time: '09.48',
    color: 'warning.main',
    text: 'New Sale recorded #ML-3467',
  },
  {
    time: '09.49',
    color: 'error.main',
    text: 'Payment was made of $64.95 to Michael Anderson',
  },
]

const DailyActivity = () => {
  return (
    <BaseCard title="Daily Activity">
      <div>
        {activities.map(activity => (
          <div key={activity.time}>
            <div
              style={{
                fontSize: '12px',
                fontWeight: '700',
                flex: '0',
              }}
            >
              {activity.time}
            </div>
            <div>
              <div
                style={{
                  borderColor: activity.color,
                }}
              />
              <div />
            </div>
            <div
              color="text.secondary"
              style={{
                fontSize: '14px',
              }}
            >
              {activity.text}
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  )
}

export default DailyActivity
