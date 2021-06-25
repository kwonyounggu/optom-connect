import React from 'react'
import { CTabs } from './style.jsx'

const CustomTabs = props => (
  <div style={{background: "orangered"}}>
    <CTabs
      variant="fullWidth"
      indicatorColor="primary"
      {...props}
    />
  </div>
)

export default CustomTabs
