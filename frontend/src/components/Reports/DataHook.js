import React, { useReducer, useCallback, useState, useEffect } from 'react'

const defaultState = {
    totalApps: 0,
    rejections: 0,
    interviews: 0,
    languages: {
      python: 0,
      html: 0,
      javascript: 0,
      ruby: 0,
      "c++": 0,
      php: 0,
      rust: 0,
      go: 0,
      "c#": 0,
      vb: 0
    },
    frameworks: {
      django: 0,
      angular: 0,
      react: 0,
      vue: 0,
      rails: 0,
      ".net": 0,
      spring: 0,
      laravel: 0,
      flutter: 0,
      'react-native': 0
    }
  }
  const reducer = (state=defaultState, action) => {
    switch (action.type) {
      case 'update-lang': {
        const { key, val } = action.payload 
        return { ...state, languages: { ...state.languages, [key]: val} }
      }
      case 'update-framework': {
        const { key, val } = action.payload 
        return { ...state, frameworks: { ...state.frameworks, [key]: val }}
      }
      case 'update-state': {
        const { key, val } = action.payload 
        return { ...state, [key]: val}
      }
      default:
        return state 
    }
  }

export default () => {
    const [state, dispatch] = useReducer(reducer, defaultState)
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

     useEffect(() => {
         if (data.length !== 0) {
            getData(data)
            setLoading(false)
         }

         const timeOut = setTimeout(() => {
            if (!loading) setLoading(false)
         }, 150)

         return () => {
            clearTimeout(timeOut)
         }
     }, [data])

    const getData = useCallback(data => {

        const languageData = { ...defaultState.languages} 
        const frameworkData = { ...defaultState.frameworks }
    
        data?.forEach(job => {
          const description = job?.description?.toLowerCase()
          Object.keys(languageData).forEach(lang => {
            if (description?.includes(lang)) {
              languageData[lang] += 1
            }
          })
    
          Object.keys(frameworkData).forEach((framework) => {
            if (description?.includes(framework)) {
              frameworkData[framework] += 1
            }
          })
        })
    
        dispatch({ type: 'update-state', payload: { key: 'languages', val: languageData}})
        dispatch({ type: 'update-state', payload: { key: 'frameworks', val: frameworkData }})
      }, [data])

    return [state, data, setData, loading]
}