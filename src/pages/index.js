import React, {
  Component
} from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

var QrReader='';
if (typeof window !== `undefined`) { 
console.log("window",window);
  QrReader = require("react-qr-reader")
   console.log("QrReader",QrReader);
}



class Test extends Component {
  state = {
    result: 'No result'
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
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <div>
		{ QrReader && 
			  <QrReader
				delay={300}
				onError={this.handleError}
				onScan={this.handleScan}
				onLoad={this.handleLoad}
				style={{ width: '100%' }}
			  />
		  }
          <p>{this.state.result}</p>
		
        </div>
        <Link to="/page-2/">Go to page 2</Link>
        </Layout>
      )
  }
    
}

export default Test
