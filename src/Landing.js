import React, { useState } from 'react';
import data from "./data.json";

export default function Landing() {

  const assets = [
    'BTC',
    'LTC',
    'SOL',
    'ADA',
  ]
  const [asset, setAsset] = useState(assets[0]);
  const [body, setBody] = useState(data);

  const filterData = (asset) => {
    var tmp = data.filter((item) => {
      if(item.token === asset) {
        return item
      }
      return null
    })
    setAsset(asset)
    setBody(tmp)
  }

  const searchResults = (e) => {
    e.preventDefault()
    var keyword = e.target.value.toLowerCase();
    var tmp = data.filter((item) => {
      if(item.token === asset && item.description.toLowerCase().includes(keyword)) {
        return item
      }
      return null
    })
    setBody(tmp)
  }

  return (
    <div className="flex flex-col items-center justify-center mt-48">
      <div className="relative w-1/2">
        <div className="absolute dropdown dropdown-left">
          <div
            tabIndex="0"
            className="absolute top-0 left-0 rounded-r-none btn btn-bg-neutral"
          >
            {asset}
          </div> 
          <ul tabIndex="0" className="p-2 shadow menu dropdown-content bg-base-200 rounded-box w-52">
            {assets.map((item, index) => {
              return <li key={index} onClick={() => filterData(item)}>
                  <a>{item}</a>
                </li> 
            })}
          </ul>
        </div>
        <input type="text"
          placeholder="Search"
          className="w-full pl-20 pr-16 input input-bg-neutral input-bordered"
          onChange={(e) => searchResults(e)}
        />
      </div>
      {body.length > 0 ? body.map((item, index)=> {
        return <div key={index} className="card mt-10 w-1/2 text-center shadow-2xl bg-neutral hover:bg-base-300">
          <div key={index} className="card-body">
            <h2 className="card-title">{item.title}</h2> 
            <p className="text-left">{item.description}</p> 
            <div className="justify-end card-actions">
              <button className="btn btn-outline btn-neutral">More info</button>
            </div>
          </div>
        </div>
      }) : <div className="mt-20">
        No results
        </div>}
    </div>
  )
}

