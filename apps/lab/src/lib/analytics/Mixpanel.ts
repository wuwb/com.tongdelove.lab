import mixpanel from 'mixpanel-browser'

mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_PROJECT_ID, {
  api_host: 'https://flowgpt.com/mp',
})

const TRACKING_ACTIVE = process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'

const mixpanelInProduction = {
  identify: (id: string) => {
    if (TRACKING_ACTIVE) mixpanel.identify(id)
  },
  alias: (id: string) => {
    if (TRACKING_ACTIVE) mixpanel.alias(id)
  },
  track: (name: string, props?: any) => {
    if (TRACKING_ACTIVE) mixpanel.track(name, props)
  },
  track_links: (div: string, name: string, props: any) => {
    if (TRACKING_ACTIVE) mixpanel.track_links(div, name, props)
  },
  register: (props: any) => {
    if (TRACKING_ACTIVE) mixpanel.register(props)
  },
}

const actions = {
  //#region custom event track
  reset: () => {
    mixpanel.reset()
  },
  start: (
    user:
      | ({ id: string } & {
          name?: string | null | undefined
          email?: string | null | undefined
          image?: string | null | undefined
        })
      | undefined
  ) => {
    if (TRACKING_ACTIVE) {
      if (user) {
        mixpanelInProduction.identify(user.id)
        Mixpanel.people.set({
          $email: user.email,
          $name: user.name,
          $last_active: new Date(),
        })
      }
    }
  },

  trackSignIn: (method: 'Google' | 'Discord' | 'Twitter' | 'Linkedin', total_followers: number, total_follow: number, total_prompts: number) => {
    mixpanelInProduction.track('Sign In', {
      method,
      total_followers,
      total_follow,
      total_prompts,
    })
  },
  trackSignUp: (method: 'Google' | 'Discord' | 'Twitter' | 'Linkedin') => {
    mixpanelInProduction.track('Sign Up', { method })
  },

  people: {
    set: (props: any) => {
      if (TRACKING_ACTIVE) mixpanel.people.set(props)
    },
    increment: (props: any) => {
      if (TRACKING_ACTIVE) mixpanel.people.increment(props)
    },
  },

  //#endregion
}

export const Mixpanel = actions
