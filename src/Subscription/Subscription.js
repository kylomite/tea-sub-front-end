import './Subscription.css';
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function Subscription() {
  let {id} = useParams();
  let [specificSubscription, setSpecificSubscription] = useState()

  useEffect(() => {
    fetchSingleSub();
  }, []);

  function fetchSingleSub() {
    fetch(`http://127.0.0.1:3000/api/v1/subscriptions/${id}`)
      .then(response => {
        console.log("Received response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Parsed data:", data);
        setSpecificSubscription(data.data); 
      })
      .catch(error => {
        console.error('Fetch operation failed:', error);
      });
  }

  function updateSubscription() {
    fetch(`http://127.0.0.1:3000/api/v1/subscriptions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        toggle_active: true,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Subscription updated:', data);
        setSpecificSubscription(data.data);
      })
      .catch(error => {
        console.error('Error updating subscription:', error);
      });
  }

  if (!specificSubscription) {
    return <p>Loading...</p>;
  }
  return (
    <main className='specific-subscription-container'>
      <h1>{specificSubscription.attributes.customer.attributes.first_name}'s order</h1>
      <button onClick={updateSubscription}>
        {specificSubscription.attributes.active ? 'Deactivate' : 'Activate'}
      </button>
      <section className='tea-info'>
        <h2>{specificSubscription.attributes.tea.attributes.title}</h2>
        <img src={specificSubscription.attributes.tea.attributes.image} alt='Image of Tea'/>
        <p>${specificSubscription.attributes.tea.attributes.price}</p>
        <p>{specificSubscription.attributes.tea.attributes.description}</p>
        <p>Temperature: {specificSubscription.attributes.tea.attributes.temp} F</p>
        <p>Brew time: {specificSubscription.attributes.tea.attributes.brew_time} Minutes</p>
      </section>
      
      <section className='customer-info'>
        <h2>
          {specificSubscription.attributes.customer.attributes.first_name}{" "}   
          {specificSubscription.attributes.customer.attributes.last_name} 
        </h2>
        <p>{specificSubscription.attributes.customer.attributes.email}</p>
        <p>
          {specificSubscription.attributes.customer.attributes.street_address}{", "}
          {specificSubscription.attributes.customer.attributes.city}{", "}
          <br/>
          {specificSubscription.attributes.customer.attributes.state}{", "}
          {specificSubscription.attributes.customer.attributes.zip}
        </p>
      </section>
    </main>
  )
}
export default Subscription;