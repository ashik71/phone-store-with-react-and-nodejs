import React, { Component } from 'react';
import {storeProducts, detailProduct} from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component{
	state={
		products: [],
		detailProduct: detailProduct,
		cart: [],
		modalOpen: false,
		modalProduct: detailProduct,
		cartSubtotal: 0,
		cartTax: 0,
		cartTotal: 0
	};
componentDidMount(){
	this.setProducts();

	const localStorageRef = localStorage.getItem('myCart');
	console.log('lolcal: ',localStorageRef);


this.setState(() =>{
			return {cart : !localStorage.getItem('myCart') 
                          ? []
                          : JSON.parse(localStorage.getItem('myCart'))
                  };
		},
		() =>{
			this.addTotals();			
		});	
};

	setProducts = () => {
		let products = [];
		storeProducts.forEach(item=>{
			const singleProduct = {...item};
			products = [...products, singleProduct];
		});

	this.setState(() =>{
			return {products};
		});
	};

	getItem = id =>{
		const product = this.state.products.find(item => item.id === id);
		return product;
	}

	handleDetail = (id)=>{
		const product = this.getItem(id);
		this.setState(() => {
			return {detailProduct: product}
		})
	};

	addToCart = (id)=>{
		let tempProducts = [...this.state.products];
		const index = tempProducts.indexOf(this.getItem(id));
		const product = tempProducts[index];
		const price = product.price;
		product.inCart = true;
		product.count = 1;
		product.total = price;

		this.setState(() =>{
			return {products: tempProducts, cart: [...this.state.cart,product] };
		},
		() =>{
			this.addTotals();
			localStorage.setItem('myCart', JSON.stringify(this.state.cart));
		});
	};

	openModal = (id) => {
		const product = this.getItem(id);
		this.setState(() =>{
			return{modalProduct: product, modalOpen:true}
		})
	};

	closeModal =() =>{
		this.setState(() =>{
			return{modalOpen:false}
		})
	};

	decrement = (id) => {
		let tempCart = [...this.state.cart];
			const selectedProduct = tempCart.find(item => item.id === id);
			const index = tempCart.indexOf(selectedProduct);
			const product = tempCart[index];
			product.count = product.count - 1;
			if(product.count === 0){
				this.removeItem(id);
				this.removeLocalStorage(id);
			}
			else{
				product.total = product.count * product.price;
					this.setState(()=>{
						return{
							cart: [...tempCart]
						};
					},
					() =>{
						this.addTotals();
					}
				)
			}
	};

	increment = (id) => {
		
			let tempCart = [...this.state.cart];
			const selectedProduct = tempCart.find(item => item.id === id);
			const index = tempCart.indexOf(selectedProduct);
			const product = tempCart[index];

			product.count = product.count+1;
			product.total = product.count * product.price;

			this.setState(()=>{
				return{
					cart: [...tempCart]
				};
			},
			() =>{
				this.addTotals();
				localStorage.setItem('myCart', JSON.stringify(this.state.cart));
			}
		)

	};

	removeItem = (id) => {
			let tempProducts = [...this.state.products];
			let tempCart = [...this.state.cart];

			tempCart = tempCart.filter(item => item.id !== id);
			const index = tempProducts.indexOf(this.getItem(id));
			let removedProduct = tempProducts[index];
			removedProduct.inCart = false;
			removedProduct.count = 0;
			removedProduct.total = 0;
			this.removeLocalStorage(id);
			this.setState(
				()=>{
				return{
					cart: [...tempCart],
					products: [...tempProducts]
				};
			},
			()=>{
				this.removeLocalStorage(id);
				this.addTotals();
			}
		);
		};

	clearCart = () => {
		this.setState(()=>{
			return{	cart: [] };
		},()=>{
			this.setProducts();
			this.addTotals();
			localStorage.removeItem("myCart");		

		})
	};
removeLocalStorage = (id) =>{
	const json = JSON.parse(localStorage.getItem('myCart'));
				for (var i=0;i<json.length;i++)
	            if (json[i].id === id) json.splice(i,1);
				localStorage["myCart"] = JSON.stringify(json);
}
addTotals = () => {
	let subTotal = 0;
	this.state.cart.map(item => (subTotal +=item.total));
	const temTax = subTotal * 0;
	const tax = parseFloat(temTax.toFixed(2));
	const total = subTotal+tax;
	this.setState(()=>{
		return{
			cartSubtotal: subTotal,
			cartTax:tax,
			cartTotal: total
		};
	})
}
	render(){
		return(
			<ProductContext.Provider value={{
				...this.state,
				handleDetail: this.handleDetail,
				addToCart: this.addToCart,
				openModal: this.openModal,
				closeModal: this.closeModal,
				decrement: this.decrement,
				increment: this.increment,
				removeItem: this.removeItem,
				clearCart: this.clearCart
			}}
			>
			{this.props.children}
			</ProductContext.Provider>
		)
	}
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };