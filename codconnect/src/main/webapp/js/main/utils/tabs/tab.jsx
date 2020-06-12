import React from 'react'
import { CTab } from './style.jsx'

const CustomTab = ({ title, subtitle, ...props }) => (
  <CTab
    label={(
      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        <h5 style={{ margin: 0 }}>{subtitle}</h5>
      </div>
    )}
    {...props}
  />
)

export default CustomTab
