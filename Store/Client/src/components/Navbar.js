import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../logo.svg';
import styled from 'styled-components'
import { ButtonContainer } from './Button';

class Navbar extends Component {
	render() {
		return (
			<NavWrapper className="navbar navbar-expand-sm navbar-dark px-sm-5">
				<Link to='/'>
					<img src={logo} alt="store" className="navbar-brand" />
				</Link>
				<ul className="navbar-nav align-items-center">
					<li class="nav-item ml-5">
						<Link to="/" className="nav-link">products
        				</Link>
					</li>
				</ul>

				<Link to="/cart" className="ml-auto">
					<ButtonContainer>
						<span className="mr-2">
							<i className="fas fa-cart-plus" />
						</span>
						my cart
	           		</ButtonContainer>
				</Link>
				<Link to="/Login" className="my-0 mr-sm-2">				
				<button class="btn btn-sm btn-outline-primary text-capitalize" type="button">login</button>
				</Link>
				<Link to="/cart" className="my-0 mr-sm-2">
				<button class="btn btn-sm  btn-outline-primary text-capitalize" type="button">signup</button>
				</Link>
				
			</NavWrapper>
		);
	}
}

const NavWrapper = styled.nav`
background: var(--mainBlue);
.nav-link {
	color: var(--mainWhite) !important;
	font-size: 1.3rem;
	text-transform: capitalize !important;
}
`

export default Navbar;