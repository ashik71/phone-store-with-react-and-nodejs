import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {ButtonContainer} from'./Button';

class Default extends Component {
    render() {
        return (
             <div className="container"> 
             	 <div className="row"> 
             	 <div className="col-10 mx-auto text-center text-uppercase text-title pt-5">
             	  <div class="error-template">
                <h1 className="display-3">
                    Oops!</h1>
                <h1 className="display-3">
                    404
                    </h1>
                     <h2>page not found</h2>
                <h3>
                the requested URL
                <span className="text-danger">
                {this.props.location.pathname}
                </span>{" "}
                was not found
                </h3> 
                <Link to="/">
                <ButtonContainer>
				<span><i class="fa fa-angle-double-left"></i></span> Back to home
				</ButtonContainer>
				</Link>
             	 </div>             	 
        		</div>
           	 	</div>
            </div>
        );
    }
}

export default Default;