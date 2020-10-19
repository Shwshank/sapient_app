/*eslint-disable*/
import React, {useEffect, useState} from 'react';
import * as Service from '../service/ApiService';
import { useParams, useHistory } from "react-router-dom";

const DisplayAssets =()=>{

  /*
  *
  * Initialize
  *
  */
  let { launch, landing, year } = useParams();
  const [spaceData, setSpaceData] = useState([])
  const [queryParams, setQueryParams ] = useState({year:'', launch:'', landing:''})
  const [refreshFlag, setRefreshFlag] = useState('flag')
  const [dataNotAval, setDataNotAval] = useState(false)

  /*
  *
  * Get params and update get object
  *
  */

  useEffect(()=>{
    let temp = {...queryParams}

    // Get year data
    if(year)
    if(year === 'notSelected'){
      temp.year = '';
    } else {
      temp.year = '&launch_year='+year;
    }

    // Get launch data
    if(launch)
    if(launch !== 'notSelected'){
      if(launch === 'True'){
        temp.launch = '&launch_success=true'
      } else {
        temp.launch = '&launch_success=false';
      }
    } else {
      temp.launch = '';
    }

    // Get landing data
    if(landing)
    if(landing !== 'notSelected'){
      if(landing === 'True'){
        temp.landing = '&land_success=true'
      } else {
        temp.landing = '&land_success=false';
      }
    } else {
      temp.landing = '';
    }

    // update object as per params received
    setQueryParams(temp)
  },[year, landing, launch]);

  /*
  *
  * convert obj values to an array
  *
  */

  useEffect(()=>{
    let tempQuery = Object.values(queryParams).join('')
    getData(tempQuery);
  }, [queryParams])

  /*
  *
  * set http request url
  *
  */

  const getData = (tempQuery='') =>{

    // refreshFlag is last recent http url send to server
    if(tempQuery!==refreshFlag){
      // if last url and current are not same then only make http call

      setSpaceData([])
      setDataNotAval(false)
      Service.getData(tempQuery).then(response=>{
        if(response.length){
          setSpaceData(response);
        } else {
          setDataNotAval(true)
        }
        // update last http url
        setRefreshFlag(tempQuery)
      });
    }
  }

  return (
    <div className='col-lg-10  col-sm-12'>
      <div className='container-fluid'>
        <div className='row justify-content-md-center'>
        {dataNotAval? <h4 style={{marginTop: '100px'}}>Data not available</h4> :

        spaceData.length>0? spaceData.map(data=>{

          return(
            <div className="card col-lg-3 col-md-5 col-sm-8 displayContainer" key = {data.flight_number}>

              <img className="card-img-top" src={data.links.mission_patch_small} alt=""/>
              <div className="card-body">
                <h5 className="card-title"> <b> {data.mission_name} # {data.flight_number} </b> </h5>
                <p style={{textAlign: "left"}}><b>Mission Id </b><br/> <b>* </b>{data.links.youtube_id}</p>

                <div>
                  <div className='cardBoxLeft'> <b> Launch Year </b> </div>
                  <div className='cardBoxRight'>
                  {data.launch_year? data.launch_year.toString() : 'NA'} <br/> &nbsp; </div>
                </div>

                <div>
                  <div className='cardBoxLeft'><b> Successful launch </b> </div>
                  <div className='cardBoxRight'>
                    {data.launch_success? 'True' : 'False'}<br/> &nbsp;
                  </div>
                </div>

                <div>
                  <div className='cardBoxLeft'><b> Successful landing </b> </div>
                  <div className='cardBoxRight'>
                    {data?.rocket?.first_stage?.cores[0]?.land_success? 'True' : 'False'}
                  </div>
                </div>

              </div>

            </div>
          )
        }):
        <div style={{marginTop: '100px'}}>
          <button className="btn btn-primary" type="button" disabled>
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              &nbsp; Loading...
          </button>
        </div>}

        </div>
      </div>
    </div>
  )
}

export default DisplayAssets;
