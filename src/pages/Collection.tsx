import React from 'react'
import Products from '../components/Products'

const Collection = () => {
  
  return (
    <div className={`${"wrapper"} w-full px-10 sm:px-16 min-h-screen pt-3 bg-slate-50`}>
      <div className=' flex items-start justify-between'>
      </div>
      <Products subTitle='Our Collection' />
    </div>
  )
}

export default Collection