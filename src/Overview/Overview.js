import './Overview.css';
import {useState} from 'react';
import SubscriptionContainer from '../SubContainer/SubscriptionContainer'

function Overview({ subData }) {
  let [searchQuery, setSearchQuery] = useState('');

  function updateSearchQuery(event) {
    setSearchQuery(event.target.value);
  }
  const filteredData = subData?.data.filter(sub => {
    const customerName = sub.attributes.customer.attributes.first_name.toLowerCase() + ' ' + sub.attributes.customer.attributes.last_name.toLowerCase();
    const teaTitle = sub.attributes.tea.attributes.title.toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    return customerName.includes(searchLower) || teaTitle.includes(searchLower);
  });

  return (
    <main className='overview-main'>
      <form className='search-bar'>
        <label for='search'>Search:</label>
        <input type='text' id='search' value={searchQuery} onChange={updateSearchQuery}/>
      </form>
      <h2 className='overview-header'>Overview</h2>
      {filteredData && filteredData.length > 0 ? (
        <SubscriptionContainer subData={{ data: filteredData }} />
      ) : (
        <p>No matching subscriptions found.</p>
      )}
    </main>
  )
}
export default Overview;