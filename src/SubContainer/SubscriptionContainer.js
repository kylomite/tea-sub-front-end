import './SubscriptionContainer.css'

function SubscriptionContainer({ subData }) {
  return (
    <section className='subscription-container'>
       <ul>
        {subData && subData.data ? (
          subData.data.map((sub) => (
            <li key={sub.id}>
              <p>{sub.attributes.customer.attributes.first_name}'s Order</p>
              <img src={sub.attributes.tea.attributes.image} alt='Image of Tea'/>
              <p>{sub.attributes.tea.attributes.title}</p>
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