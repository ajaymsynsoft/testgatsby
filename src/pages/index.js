import React, {
  Component
} from "react"

import Layout from "../components/layout"

var QrReader ='';

class Test extends Component {
  state = {
    result: 'No result',
    QrReader: false,
  }

   componentDidMount() {
    console.log("componentDidMount");
    try {
      QrReader = require("react-qr-reader");       
      this.setState({QrReader:true});   
      console.log("QrReader",QrReader);  
    } catch (e) {
      console.error(e);
    }
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


  render() {
    return (
      <Layout>   
        { this.state.QrReader &&    
         <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          onLoad={this.handleLoad}
          style={{ width: '100%' }}
          /> 		  		 
        }
        </Layout>
      )
  }    
}

export default Test
