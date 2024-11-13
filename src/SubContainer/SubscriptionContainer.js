import './SubscriptionContainer.css'
import { useNavigate } from 'react-router-dom';

function SubscriptionContainer({ subData }) {
  let navigate = useNavigate();
  function renderSub(id) {
    navigate(`/Subscription/${id}`);
  }
  return (
    <section className='subscription-container'>
       <ul>
        {subData && subData.data ? (
          subData.data.map((sub) => (
            <button key={sub.id} onClick={() => renderSub(sub.id)}>
              <p>{sub.attributes.active ? 'Active' : 'Inactive'}</p>
              <p>{sub.attributes.customer.attributes.first_name}'s Order</p>
              <img src={sub.attributes.tea.attributes.image} alt='Image of Tea'/>
              <p>{sub.attributes.tea.attributes.title}</p>
            </button>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </section>
  )
}

export default SubscriptionContainer;