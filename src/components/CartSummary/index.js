// Write your code here
import './index.css'

const CartSummary = props => {
  const {cartList} = props
  console.log(cartList)

  const getTotalScore = () => {
    const total = cartList.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )
    return total
  }

  const totalScore = getTotalScore()

  return (
    <div className="order-summary-section">
      <h1 className="total-amount">
        Order Total: <span className="summary-price">Rs {totalScore}/-</span>
      </h1>
      <p>{cartList.length} Items in cart</p>
      <button className="checkout-button">Checkout</button>
    </div>
  )
}
export default CartSummary
