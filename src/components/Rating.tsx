import React from 'react'
import { RatingHalfIcon, RatingIcon } from './icons'

interface RatingProps{
    count: number
    rating: number
}

const Rating: React.FC<RatingProps> = ({count, rating}) => {
  return (
    <div className=' flex items-center gap-0.5 mb-2'>
        <p className=' text-xs text-gray-700 mr-1 '>({rating}/5)</p>
        {Array.from({length: count}).map((_, index) =>(
            <p key={index} className=" text-orange-500 text-sm"><RatingIcon/></p> 
        ))}
        <p className=" text-orange-500 text-sm"><RatingHalfIcon/></p> 
    </div>
  )
}

export default Rating