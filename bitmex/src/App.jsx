import React, { useState, useEffect } from 'react'

import './App.css'

function App() {
  const[data, setData] = useState([])

  const ws = new WebSocket("wss://ws.bitmex.com/realtime?subscribe=instrument,orderBookL2_25:XBTUSD")

  ws.onopen = () => {
    console.log("Connected websocket")
  }

  ws.onmessage = (event) => {
    const newData = JSON.parse(event.data)
    setData([...data, ...newData.data])
  }

  return (
    <div >
      <div>
        <h1>BitMEX</h1>
      </div>
      
      <table className="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Side</th>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
            <th scope="col">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item) => (
              <tr key={item.id}>
                  <td>{item.symbol}</td>
                  <td>{item.side}</td>
                  <td>{item.size}</td>
                  <td>{item.price}</td>
                  <td>{item.timestamp}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App
