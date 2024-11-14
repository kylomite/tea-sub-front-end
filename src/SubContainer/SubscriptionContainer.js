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
            <li>
              <button className='subscription-button' key={sub.id} onClick={() => renderSub(sub.id)}>
                <p className="active-status">{sub.attributes.active ? 'Active' : 'Inactive'}</p>
                <p className='customer'>{sub.attributes.customer.attributes.first_name}'s Order</p>
                <img className='image' src={sub.attributes.tea.attributes.image} alt='Image of Tea'/>
                <p className='tea-title'>{sub.attributes.tea.attributes.title}</p>
              </button>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </section>
  )
}

export default SubscriptionContainer;