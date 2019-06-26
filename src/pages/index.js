import React, {
  Component
} from "react"
import { Link } from "gatsby"
import QrReader from 'react-qr-reader'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

class Test extends Component {
  state = {
    result: 'No result'
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }
  handleError = err => {
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
			<QrReader
			  delay={300}
			  onError={this.handleError}
			  onScan={this.handleScan}
			  style={{ width: '100%' }}
			/>
			<p>{this.state.result}</p>
		  </div>
		  <Link to="/page-2/">Go to page 2</Link>
		</Layout>
	)
  }
}

export default Test
