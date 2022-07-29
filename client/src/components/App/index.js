import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Home from '../Home';
import Landing from '../Landing';
import PrivateRoute from '../Navigation/PrivateRoute.js';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	    <div>
        <PrivateRoute exact path="/" component={Landing}/>
	    </div>
	  </Router>
    );
  }
}

export default App;

/*

MSci 245 - Test 1

********* This test contains 4 questions, listed below. ***********

Q1. Turn products list into a stateful list.

Q2. Create "inStock" stateful variable of type Boolean, and set it to true by default.

Q3. Using ternary operator for conditional rendering, display only those products that are in stock. 
    Use "inStock" stateful variable to perform conditional rendering.

Q4. Complete the function "handleDiscountedProducts" that toggles between two modes: "Show discounted products only" 
    and "Show all products", in response to the user checking/unckecking the checkbox "DiscountCheckBox".

*/

// import * as React from 'react';
// import Typography from "@material-ui/core/Typography";
// import Grid from "@material-ui/core/Grid";
// import Checkbox from '@material-ui/core/Checkbox';

// const App = () => {
//   const [inStock, setInStock] = React.useState(true);

//   const unstatefulProducts = [{
//     id: 1,
//     title: 'Gala apple',
//     category: 'fruit',
//     price: 1.20,
//     discount: true,
//     discountAmount: "20%",
//     inStock: true
//   },
//   {
//     id: 2,
//     title: 'Green pepper',
//     category: 'vegetable',
//     price: 2.30,
//     discount: true,
//     discountAmount: "10%",
//     inStock: false
//   },
//   {
//     id: 3,
//     title: 'Whole-wheat tortilla',
//     category: 'bread',
//     price: 3.20,
//     discount: false,
//     discountAmount: "20%",
//     inStock: true
//   },
//   {
//     id: 4,
//     title: 'Sesame bagel',
//     category: 'bread',
//     price: 1.05,
//     discount: true,
//     discountAmount: "10%",
//     inStock: false
//   },
//   {
//     id: 3,
//     title: 'Fruit yoghurt',
//     category: 'dairy',
//     price: 4.30,
//     discount: false,
//     discountAmount: "10%",
//     inStock: true
//   },
//   {
//     id: 4,
//     title: 'Cheddar cheese',
//     category: 'dairy',
//     price: 5.00,
//     discount: true,
//     discountAmount: "10%",
//     inStock: true
//   },];

//   const [products, setProducts] = React.useState(unstatefulProducts);

//   React.useEffect(() => {
//     const inStockProducts = products.filter(
//       (product) => product.inStock == true
//     );
//     inStock ? setProducts(inStockProducts) : setProducts(unstatefulProducts);
//   }, [inStock]);

//   const handleDiscountedProducts = (checked) => {
//     if (checked) {
//       const discountedProducts = products.filter(
//         (product) => product.discount === true
//       );
//       setProducts(discountedProducts)
//     } else {
//       const inStockProducts = unstatefulProducts.filter(
//         (product) => product.inStock == true
//       );
//       inStock ? setProducts(inStockProducts) : setProducts(unstatefulProducts);
//     }
//   }

//   return (
//     <Grid
//       container
//       spacing={1}
//       style={{ maxWidth: '50%', margin: 20 }}
//       direction="column"
//       justify="flex-start"
//       alignItems="stretch"
//     >
//       <Typography variant="h3" gutterBottom component="div">
//         Online Grocery Store
//       </Typography>

//       <DiscountCheckBox
//         onCheck={handleDiscountedProducts}
//       />

//       <List
//         list={products}
//       />

//     </Grid>
//   );
// }


// const DiscountCheckBox = ({ onCheck }) => {

//   const handleChange = (event) => {
//     onCheck(event.target.checked);
//   };

//   return (
//     <div>
//       Show discounted products only
//       <Checkbox
//         onChange={handleChange}
//       />
//       <hr />
//     </div>
//   );
// }

// const List = ({ list }) => {
//   return (
//     <>
//       {list.map((item) => {
//         return (
//           <>
              
//               <Item
//                 item={item}
//               />

//           </>
//         );
//       })}
//     </>

//   )
// }

// const Item = ({ item }) => {


//   return (
//     <>
//       <Grid item>
//         <Typography variant="h6" gutterBottom component="div">
//           {item.title}
//         </Typography>
//         <Typography variant="body1" gutterBottom component="div">
//           {"Category: " + item.category}
//         </Typography>
//         <Typography variant="body1" gutterBottom component="div">
//           {"Price: $" + item.price}
//         </Typography>
//         <Typography variant="body1" gutterBottom component="div">
//           {"Discount: " + item.discount}
//         </Typography>
//         <Typography variant="body1" gutterBottom component="div">
//           {"Discount Percentage: " + item.discountAmount}
//         </Typography>
//       </Grid>
//     </>
//   )
// }


// export default App;