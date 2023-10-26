import React, { useRef, useEffect } from 'react'
import PieChart from './PieChart'

const Chart =  ({ data }) => {
    
    const svgRef = useRef()

    useEffect(() => {
        
        const formatedData = Object.keys(data).reduce((prev, cur) => {
            if (data[cur] !== 0) {
                prev.push({ name: cur, value: data[cur]})
            }
            return prev
            
        }, [])
        
        PieChart(formatedData, svgRef, {
            name: d => d.name,
            value: d => d.value,
            width: 500,
            height: 500 
        })
    }, [])

    

    return (
        <svg ref={svgRef} />
    )
}

export default React.memo(Chart)