import React, { Component, ReactNode } from 'react'
import Tab from './Tab'
import './Tabs.module.scss'

type ITabsProps = {
  activeChild: any
  children: any[]
}

class Tabs extends Component<ITabsProps, any> {
  constructor(props: any) {
    super(props)

    this.state = {
      activeTab: this.props.children[0]?.props.label,
    }
  }

  onClickTabItem = (tab: any) => {
    this.setState({ activeTab: tab })
  }

  componentDidMount() {
    const index = this.props.activeChild
    if (index) {
      this.setState({ activeTab: this.props.children[index].props.label })
    }
  }

  render() {
    const {
      onClickTabItem,
      props: { children },
      state: { activeTab },
    } = this

    return (
      <div className="tabs">
        <ol className="tab-list">
          {Array(children).map((child: any) => {
            const { label } = child.props

            return (
              <Tab
                activeTab={activeTab}
                key={label}
                label={label}
                onClick={onClickTabItem}
              />
            )
          })}
        </ol>
        <div className="tab-content">
          {Array(children).map((child: any) => {
            if (child.props.label !== activeTab) return undefined
            return child.props.children
          })}
        </div>
      </div>
    )
  }
}

export default Tabs
