import React, { useEffect } from 'react'
import Header from '../Header';
import DataHook from './DataHook'
import Row from './Row'
import Title from './Title'
import Columns from './Columns'
import { GetJobs } from '../../services/Api';
import Column from './Column'
import Chart from "./Chart"
import { useSelector } from 'react-redux'

export default function Reports() {
  const [state, jobs, setJobs, loadingJobs] = DataHook()
  const [appState, apps, setApps, loadingApps] = DataHook()
  const applications = useSelector(state => state.user.applications)

  const isEmpty = (obj)=> Object.keys(obj).reduce((p, c) => p + obj[c], 0) === 0
  const NoData = () => <p>No data to show</p>

  const fetchJobs = async () =>  {
    const { data } = await GetJobs()
    setJobs(data)
  }

  

  useEffect(() => {
    jobs.length === 0 && fetchJobs()
    apps.length === 0 && setApps(applications)
  }, [jobs, apps])

 
  return (
    <div className="py-2">
      <Header title='Reports' link={null}/>
      { !loadingApps && <Row>
          <Title text="Applied Jobs"/>
          <Columns>
            <Column item={{name: 'Languages'}}>
              { !isEmpty(appState.languages) ? 
                <Chart data={appState.languages}/>  
                : <NoData/>
              }
            </Column>
            <Column item={{name: 'Frameworks'}}>
              { !isEmpty(appState.frameworks) ? 
                <Chart data={appState.frameworks}/>  
                : <NoData />
              }
            </Column>
            <Column item={{name: 'Total Job Postings', stat: apps.length}}> 
            </Column>
          </Columns>
        </Row> }
        { !loadingJobs && <Row>
          <Title text="All Job Postings"/>
          <Columns>
            <Column item={{name: 'Languages'}}>
              { !isEmpty(state.languages) ? 
                <Chart data={state.languages}/> 
                : <NoData />
              }
            </Column>
            <Column item={{name: 'Frameworks'}}>
              {!isEmpty(state.frameworks) ?
               <Chart data={state.frameworks}/>  
               : <NoData />
              }
            </Column>
            <Column item={{name: 'Total Job Postings', stat: jobs.length}}> 
            </Column>
          </Columns>
        </Row> }
    </div>
  )
}
