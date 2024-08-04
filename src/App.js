import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    const {cartList} = this.state
    this.setState({
      cartList: [],
    })
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.id === id
          ? {...eachItem, quantity: eachItem.quantity + 1}
          : eachItem,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem =>
        eachItem.id === id
          ? {...eachItem, quantity: eachItem.quantity - 1}
          : eachItem,
      ),
    }))
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartItems = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({
      cartList: filteredCartItems,
    })
  }

  addCartItem = product => {
    const {cartList} = this.state

    const item = cartList.find(eachItem => eachItem.id === product.id)
    if (item) {
      this.setState(prevState => ({
        cartList: cartList.map(eachItem =>
          eachItem.id === product.id
            ? {...eachItem, quantity: eachItem.quantity + 1}
            : eachItem,
        ),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
