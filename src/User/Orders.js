import React from 'react'
import Usermenu from '../components/Usermenu'

const Orders = () => {
  return (
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
    <div className='col-md-3'>
        <Usermenu/>
    </div>
    <div className='col-md-9'>
    <h1>all orders</h1>
    </div>
    </div>
    </div>
  )
}

export default Orders