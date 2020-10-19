import React ,{useState} from 'react';
import { useHistory } from "react-router-dom";

const Filter =()=>{

  /*
  *
  * Initialize
  *
  */

  const yearAndStatus = [
    {name: '2006', selected: false},
    {name: '2007', selected: false},
    {name: '2008', selected: false},
    {name: '2009', selected: false},
    {name: '2010', selected: false},
    {name: '2011', selected: false},
    {name: '2012', selected: false},
    {name: '2013', selected: false},
    {name: '2014', selected: false},
    {name: '2015', selected: false},
    {name: '2016', selected: false},
    {name: '2017', selected: false},
    {name: '2018', selected: false},
    {name: '2019', selected: false},
    {name: '2020', selected: false},
  ]

  const successfulLaunchStatus = [
    {name: 'True', selected: false},
    {name: 'False', selected: false},
  ]

  const successfulLandingStatus = [
    {name: 'True', selected: false},
    {name: 'False', selected: false},
  ]

  const params = {
    year: '/notSelected',
    landing: '/notSelected',
    launch: '/notSelected',
  }

  /*
  *
  * Set States
  *
  */

  const [urlParams, setUrlParams] = useState(params);
  const [yearButtons, setYearButtons] = useState([...yearAndStatus])
  const [launchButtons, setlaunchButtons] = useState([...successfulLaunchStatus])
  const [landingButtons, setLandingButtons] = useState([...successfulLandingStatus])
  const history = useHistory();

  /*
  *
  * Toggle year button actoin
  *
  */

  const toggleYearButton = (buttonStatus, index) =>{
    let tempYearAndStatus = [...yearAndStatus];
    tempYearAndStatus[index] = {...buttonStatus, selected:!buttonStatus.selected}
    setYearButtons([...tempYearAndStatus])
    if(!buttonStatus.selected){
      updateQueryParams('year', '/'+buttonStatus.name)
    } else {
      updateQueryParams('year', '/notSelected')
    }
  }

  /*
  *
  * Toggle launch button
  *
  */

  const toggleLaunchButton = (buttonStatus, index) =>{
    let tempLaunchStatus = [...successfulLaunchStatus];
    tempLaunchStatus[index] = {...buttonStatus, selected:!buttonStatus.selected}
    setlaunchButtons([...tempLaunchStatus])
    if(!buttonStatus.selected){
      updateQueryParams('launch', '/'+buttonStatus.name)
    } else {
      updateQueryParams('launch', '/notSelected')
    }
  }

  /*
  *
  * Toggle landind button
  *
  */

  const toggleLandingButton = (buttonStatus, index) =>{
    let tempLandingStatus = [...successfulLandingStatus];
    tempLandingStatus[index] = {...buttonStatus, selected:!buttonStatus.selected}
    setLandingButtons([...tempLandingStatus])
    if(!buttonStatus.selected){
      updateQueryParams('landing', '/'+buttonStatus.name)
    } else {
      updateQueryParams('landing', '/notSelected')
    }
  }

  /*
  *
  * Navigation and state update, for all buttons
  *
  */

  const updateQueryParams = (key, value) =>{
    let tempUrl = {...urlParams}
    tempUrl[key] = value
    history.replace(Object.values(tempUrl).join(''))
    setUrlParams(tempUrl)
  }

  return (
    <div className='col-lg-2 col-sm-12 ' >
      <div className='filterBox'>
        <p> <b> Filters </b> </p>
        <p>Launch Year</p>
        <hr/>
        {
          yearButtons.map((button, index)=>{
            return(
              <button type="button"
              className={button.selected? 'btn btn-success btnSelectedColor' : 'btn btn-success notSelected'}
              key={button.name}
              onClick={e=>{
                e.preventDefault();
                toggleYearButton(button,index);
              }}
              >{button.name}</button>
            )
          })
        }

        <p>Successful Launch</p>
        <hr/>
        {
          launchButtons.map((button, index)=>{
            return(
              <button type="button"
              className={button.selected? 'btn btn-success btnSelectedColor' : 'btn btn-success notSelected'}
              key={button.name}
              onClick={e=>{
                e.preventDefault();
                toggleLaunchButton(button,index);
              }}
              >{button.name}</button>
            )
          })
        }

        <p>Successful Landing</p>
        <hr/>
        {
          landingButtons.map((button, index)=>{
            return(
              <button type="button"
              className={button.selected? 'btn btn-success btnSelectedColor' : 'btn btn-success notSelected'}
              key={button.name}
              onClick={e=>{
                e.preventDefault();
                toggleLandingButton(button,index);
              }}
              >{button.name}</button>
            )
          })
        }

      </div>
    </div>
  )
}

export default Filter;
