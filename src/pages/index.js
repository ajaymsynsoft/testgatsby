import React, {
  Component
} from "react"

import Layout from "../components/layout"

if (typeof window != 'undefined') {
    var QrReader = require('react-qr-reader')
}

class Test extends Component {
  state = {
    result: 'No result',
    showComponent: false
  }

  handleScan = data => {
	alert(JSON.stringify(data));
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  
  handleLoad = data => {
	alert(JSON.stringify(data));
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  

  
  handleError = err => {
	  alert(JSON.stringify(err));
    console.error(err)
  }

  onButtonClick = err => {
    console.log("onButtonClick",err);
    this.setState({
      showComponent: true,
    });
  }


  render() {
    return (
      <Layout>   
      <button  onClick={this.onButtonClick}>Button</button >
       {this.state.showComponent ?
           <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          onLoad={this.handleLoad}
          style={{ width: '100%' }}
          /> :
           null
        }     
		  		 
          <p>{this.state.result}</p>	      
        </Layout>
      )
  }    
}

export default Test
