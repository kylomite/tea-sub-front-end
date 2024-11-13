import './Overview.css';
import SubscriptionContainer from '../SubContainer/SubscriptionContainer'

function Overview({ subData }) {

  return (
    <main className='overview-main'>
      <form className='search-bar'>
        <label for search>Search:</label>
        <input type='text' id='search'/>
      </form>
      <h2 className='overview-header'>Overview</h2>
      {subData && (
        <SubscriptionContainer subData={subData} />
      )}
    </main>
  )
}
export default Overview;