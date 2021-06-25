import React from 'react'

const TabContent = ({ value, index, children }) => (
  <div
    value={value}
    hidden={value !== index}
    role="tabpanel"
    index={index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {children}
  </div>
)

export default TabContent
