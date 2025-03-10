import React, {useState} from 'react'
import { House, Banknote } from 'lucide-react';
import { Link } from 'react-router-dom';

function Checkout() {
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Enter Your Name');
    const [email, setEmail] = useState('email@example.com');
    const [phone, setPhone] = useState('+923000000000');

  const cartItems = [
    { name: "Chicken Karahi", price: 700 },
    { name: "Kachumber Salad", price: 350 },
  ];

  const subtotal = 1400;
  const serviceFee = 10;
  const packagingFee = 25;
  const totalDiscount = 200;
  const totalPrice = subtotal + serviceFee + packagingFee - totalDiscount;



  const handleEdit = () => setIsEditing(!isEditing);
  return (
    <div className="container mt-4">
        <h5 className='text-start fw-bold'>Checkout</h5>
    <div className="row">
      {/* Left Section */}
      <div className="col-md-8 ">
        {/* Delivery Address */}
        <div className="border bg-light rounded p-3 mb-3 text-start">
          <h5 className='fw-semibold mb-3'>Delivery Address <span className="float-end fs-6 text-dark">Change</span></h5>
          <p className="mb-3"><House size={20}/> Home, Bahria Town</p>
          <input 
  type="text" 
  className="form-control border rounded p-2 text-muted" 
  placeholder="Note to rider: e.g. landmark, directions"
/>

        </div>

        {/* Delivery Options */}
        <div className="border bg-light rounded p-3 mb-3">
          <h5 className='text-start fw-semibold mb-3'>Delivery Options</h5>
          <div className="border rounded p-2 text-start">
          <div className="form-check ">
            <input className="form-check-input" type="radio" name="delivery" checked readOnly />
            <div className=' d-flex justify-content-between'>
            <label className="form-check-label ">Standard Delivery </label>
            <label className="form-check-label ">10-20 mins </label>
            </div>
          </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="border bg-light rounded p-3 mb-3 text-start">
      <h5 className="fw-semibold mb-3">
        Personal Information 
        <span className="float-end fs-6 text-dark" onClick={handleEdit} style={{ cursor: 'pointer' }}>
          {isEditing ? 'Save' : 'Edit'}
        </span>
      </h5>

      {isEditing ? (
        <>
          <input 
            type="text" 
            className="form-control mb-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input 
            type="email" 
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="tel" 
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </>
      ) : (
        <>
          <small className="mb-1">{name}</small><br />
          <small>{email}</small><br />
          <small>{phone}</small>
        </>
      )}
    </div>

        {/* Payment Options */}
        <div className="border bg-light rounded p-3 mb-3">
  <h5 className="fw-semibold mb-3 text-start">Payment Options</h5>
  <div className="border text-start rounded p-3">
  <div className="form-check">

    <input
      className="form-check-input"
      type="radio"
      name="payment"
      checked={paymentMethod === "Cash on Delivery"}
      onChange={() => setPaymentMethod("Cash on Delivery")}
    />
    
    <label className="form-check-label fw-semibold"> <Banknote /> Cash on Delivery</label>
    <p className='mt-2 fs-6 text-muted'>Simply pay the rider , when he is on your doorstep</p>
  </div>
</div>
</div>


        {/* Place Order Button */}
        <Link to='/delivery'>
        <button className="btn btn-success w-100 py-2 mb-5">PLACE ORDER</button>
        </Link>
      </div>

      {/* Right Section (Order Summary) */}
      <div className="col-md-4">
        <div className="border rounded p-3  bg-light">
          <h6 className='fw-semibold'>Your order from Bahria Town LHR store</h6>
          <ul className="list-unstyled">
            {cartItems.map((item, index) => (
              <li key={index}>{item.name} - Rs. {item.price}</li>
            ))}
          </ul>
          <hr />
          <h5 className='text-start text-success fs-5 fw-bold'>Order Summary</h5>
          <p className='text-start fw-semibold '>Subtotal: <span className="float-end">Rs. {subtotal}</span></p>
          <p className='text-start fw-semibold'>Service Fee: <span className="float-end">Rs. {serviceFee}</span></p>
          <p className='text-start fw-semibold '>Packaging Fee: <span className="float-end">Rs. {packagingFee}</span></p>
          <hr />
          <h6 className='text-start fw-semibold bg-warning p-3 rounded '>Total Price:
            <br/> <span className='text-secondary fw-normal fs-6'>(incl. fees and tax)</span> 
             <span className="float-end text-success">Rs. {totalPrice}</span></h6>
        </div>
      </div>
    </div>
  </div>
);
}

export default Checkout
