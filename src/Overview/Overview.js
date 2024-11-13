import './Overview.css';
import { useState, useEffect } from "react";
import SubscriptionContainer from '../SubContainer/SubscriptionContainer'

function Overview({ subData }) {

  return (
    <main className='overview-main'>
      <section className='search-bar'>Search</section>
      <h2 className='overview-header'>Overview</h2>
      {subData && (
        <SubscriptionContainer subData={subData} />
      )}
    </main>
  )
}
export default Overview;