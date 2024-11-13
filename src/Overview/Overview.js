import './Overview.css';
import { useState, useEffect } from "react";
import SubscriptionContainer from '../SubContainer/SubscriptionContainer'

function Overview() {
  let [subData, setSubData] = useState()

  useEffect(() => {
    fetchAllSubs();
  }, []);

  function fetchAllSubs() {
    fetch("http://127.0.0.1:3000/api/v1/subscriptions")
      .then(response => {
        console.log("Received response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Parsed data:", data);
        setSubData(data); 
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  }
  return (
    <main className='overview-main'>
      <section className='search-bar'>Search</section>
      <h2 className='overview-header'>Overview</h2>
      <SubscriptionContainer subData={subData}/>
    </main>
  )
}
export default Overview;