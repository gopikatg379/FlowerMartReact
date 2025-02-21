import { Route,Routes} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Add from './components/Add';
import ViewMore from './components/ViewMore';
import Register from './components/Register';
import Logout from './components/Logout';
import MyProfile from './components/MyProfile';
import SearchResults from './components/SearchResults';
import AddCart from './components/AddCart';
import ViewCart from './components/ViewCart';
import DeleteCart from './components/DeleteCart';
import AddWishlist from './components/AddWishlist';
import ViewWishlist from './components/ViewWishlist';
import DeleteWishlist from './components/DeleteWishlist';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Order from './components/Order';
import ViewOrder from './components/ViewOrder';
import MyOrders from './components/MyOrders';
import UpdateFlower from './components/UpdateFlower';
import ViewCategory from './components/ViewCategory';
import AddCategory from './components/AddCategory';
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/view/:id' element={<ViewMore></ViewMore>}></Route>
        <Route path='/logout' element={<Logout></Logout>}></Route>
        <Route path="/profile" element={<MyProfile />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard/>}></Route>
          <Route path="view/wishlist" element={<ViewWishlist />} />
          <Route path='my/orders' element={<MyOrders/>}></Route>
        </Route>
        <Route path="/admin/profile" element={<AdminDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path='dashboard' element={<Dashboard/>}></Route>
          <Route path="add" element={<Add />} />
          <Route path='view/order' element={<ViewOrder/>}></Route>
          <Route path='add/category' element={<AddCategory/>}></Route>
          <Route path='view/category' element={<ViewCategory/>}></Route>
        </Route>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/cart/:id" element={<AddCart />} />
        <Route path='/view/cart' element={<ViewCart/>}></Route>
        <Route path='delete/cart/:id' element={<DeleteCart/>}></Route>
        <Route path='/wishlist/:id' element={<AddWishlist/>}></Route>
        <Route path='/delete/:id' element={<DeleteWishlist/>}></Route>
        <Route path='/order' element={<Order/>}></Route>
        <Route path='/update/:id' element={<UpdateFlower/>}></Route>
        
        
      </Routes>
    </>
  )
}

export default App
