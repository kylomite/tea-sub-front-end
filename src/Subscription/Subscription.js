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
        if (!response.ok) {
          throw new Error(response.status); 
        }  
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
      .then(response => {
        console.log("Received response:", response);
        if (!response.ok) {
          throw new Error(response.status); 
        }  
        return response.json()
      })
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
      <section className='header-container'>
        <h1 className='header-sub'>{specificSubscription.attributes.customer.attributes.first_name}'s Subscription</h1>
        <button className='active-sub'onClick={updateSubscription}>
          {specificSubscription.attributes.active ? 'Deactivate' : 'Activate'}
        </button>
      </section>
      <section className='subscription-details'>
        <section className='tea-info'>
          <h2 className='title-sub'>{specificSubscription.attributes.tea.attributes.title}</h2>
          <img className='image-sub' src={specificSubscription.attributes.tea.attributes.image} alt='Image of Tea'/>
          <p className='price-sub'>Price: ${specificSubscription.attributes.tea.attributes.price}</p>
          <p className='description-sub'>{specificSubscription.attributes.tea.attributes.description}</p>
          <p className='temp-sub'>Temperature: {specificSubscription.attributes.tea.attributes.temp} F</p>
          <p className='brew-time-sub'>Brew time: {specificSubscription.attributes.tea.attributes.brew_time} Minutes</p>
        </section>
        
        <section className='customer-info'>
          <h2 className='name-sub'>
            Customer: {specificSubscription.attributes.customer.attributes.first_name}{" "}   
            {specificSubscription.attributes.customer.attributes.last_name} 
          </h2>
          <p className='email-sub'>Email: {specificSubscription.attributes.customer.attributes.email}</p>
          <p className='address-sub'>
            Address: 
            <br/>
            {specificSubscription.attributes.customer.attributes.street_address}{", "}
            {specificSubscription.attributes.customer.attributes.city}{", "}
            <br/>
            {specificSubscription.attributes.customer.attributes.state}{", "}
            {specificSubscription.attributes.customer.attributes.zip}
          </p>
        </section>
      </section>
    </main>
  )
}
export default Subscription;