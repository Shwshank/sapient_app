const baseUrl = 'https://api.spacexdata.com/v3/launches?limit=100';

export const getData = async (filters='')=>{
  let response = await fetch(baseUrl+filters,{
    method: 'GET',
    mode: 'cors',
  });
  return response.json();
}
