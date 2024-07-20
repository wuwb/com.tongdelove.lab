import React from 'react'
import { Button } from 'antd'
import axios from 'axios'
import {
  POSTS_API_URL,
  AUTHORS_API_URL,
  MEDIA_API_URL,
} from '@/config/constant'
import SiteConfig from '@/config/site'

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div'
  tag = item.href ? 'a' : tag
  let children =
    typeof item.children === 'string' && item.children.match(isImg)
      ? React.createElement('img', { src: item.children, alt: 'img' })
      : item.children
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children,
    })
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children)
}

const labels = SiteConfig.labels || {}
const layouts = SiteConfig.layouts || {}

export const Configs = {
  author: SiteConfig.author || 'Wenbin',
  summary: SiteConfig.summary || '无物网络。',
  title: SiteConfig.title || '无物。',

  email: SiteConfig.email ? `mailto:${SiteConfig.email}` : null,
  github: SiteConfig.github ? `https://github.com/${SiteConfig.github}` : null,
  twitter: SiteConfig.twitter
    ? `https://twitter.com/${SiteConfig.twitter}`
    : null,

  enableViews: SiteConfig.enableViews || false,
  latestLimit: SiteConfig.latestLimit || 5,
  isCN: () => SiteConfig.language.includes('cn'),

  labels: {
    default: labels.default || 'posts',
    latest: labels.latest || 'latest',
    list: labels.list || 'all posts',
  },

  layouts: {
    pageWidth: layouts.pageWidth || '750px',
    pageWidthMobile: layouts.pageWidthMobile || '88vw',
  },
}

export const isServer = typeof window === 'undefined'

// Removes empty query parameters from the query object
export const filterQuery = (query: any) => {
  return Object.keys(query).reduce<any>((obj, key) => {
    if (query[key]?.length) {
      obj[key] = query[key]
    }
    return obj
  }, {})
}

export const getAllPostsFromServer = async () => {
  //   get all posts from Server
  try {
    const { data } = await axios.get(POSTS_API_URL)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const getAuthor = async id => {
  try {
    const {
      data: { name },
    } = await axios.get(`${AUTHORS_API_URL}/${id}`)
    return name
  } catch (error) {
    console.log(error)
  }
}

export const getFeaturedImage = async id => {
  try {
    const res = await axios.get(`${MEDIA_API_URL}/${id}`)
    return res.data.guid.rendered
  } catch (error) {
    console.log(error)
    return ''
  }
}

export const getDNSPrefetchValue = domain => {
  if (!domain) return null
  if (domain.startsWith('http')) return domain.replace(/https?:/, '')
  if (domain.startsWith('//')) return domain
  return `//${domain}`
}
