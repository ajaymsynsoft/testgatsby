import React, {
    Component
} from "react"

import Layout from "../components/layout"
import ReactPlayer from 'react-player'
import audioList from "../components/config"
const queryString = require('query-string');

var QrReader = '';

class Test extends Component {
    state = {
        result: 'No result',
        QrReader: false,
        showQrReader: true,
        showMP3Player: false,
        showWelcomeScreen: true,
        url: null,
        pip: false,
        playing: true,
        controls: false,
        light: false,
        volume: 0.8,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false
    }

    componentDidMount() {
        console.log("componentDidMount",this.props.location.search);
		var parsed = queryString.parse(this.props.location.search);		
		console.log(parsed.pwa);		
        try {	
			audioList.map(r=>{
				console.log(r);
				const audio = new Audio();
				audio.src = r;
			});
            QrReader = require("react-qr-reader");
			if(parsed && !!parsed.pwa){
				this.setState({ showWelcomeScreen: false });
			}
            this.setState({ QrReader: true });
            console.log("QrReader", QrReader);
        } catch (e) {
            console.error(e);
        }
    }


    playPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    handleAfterEnd = data => {
        console.log("handleAfterEnd", data);
        this.setState({
            url: '',
            result: '',
            showQrReader: true,
            showMP3Player: false,
			showWelcomeScreen: false,
            playing: false
        })
    }

    handleRestart = data => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(0))
        this.setState({ seeking: true })
    }

    handleScan = url => {
        console.log(url);
        if (typeof url == 'string') {
            url = url.toLowerCase();
            console.log(url);
            if (audioList.indexOf(url) > -1) {
                this.setState({
                    result: url,
                    showQrReader: false,
                    showMP3Player: true,
                    playing: true,
                    url,
                    played: 0,
                    loaded: 0,
                    pip: false
                })       



            }
        }
    }



    ref = player => {
        this.player = player;

    }

    handleLoad = url => {
        console.log(url);
		//alert("Welcome Screen");
        // alert(JSON.stringify(data));
        if (typeof url == 'string') {
            url = url.toLowerCase();
            console.log("url", audioList.indexOf(url));
            console.log(url);
            if (audioList.indexOf(url) > -1) {
                this.setState({
                   result: url,
                    showQrReader: false,
                    showMP3Player: true,
                    playing: true,
                    url,
                    played: 0,
                    loaded: 0,
                    pip: false
                })
            }
        }
    }

    onProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
            this.setState(state)
        }
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }
    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    onPause = () => {
        console.log('onPause')
        this.setState({ playing: false })
    }

    onPlay = () => {
        console.log('onPlay')
        this.setState({ playing: true })
    }



    handleError = err => {
        console.error(JSON.stringify(err));
        console.error(err)
    }
	
	onError = err => {
        alert("You are offline. For this QR code please go online.");
        console.error(err);
		this.setState({
            url: '',
            result: '',
            showQrReader: true,
            showMP3Player: false,
			showWelcomeScreen: false,
            playing: false
        })
    }


    render() {
        const { url, playing, controls, muted } = this.state
        return (
            <Layout>  
		{ this.state.showWelcomeScreen  &&    
          <div>
			<h1>Welcome.....</h1>
			<p>Please  <button className="button" onClick={this.handleAfterEnd}>click here</button> to continue scan QR code.</p>
          </div>         
        }			
        { !this.state.showWelcomeScreen && this.state.showQrReader && this.state.QrReader &&    
          <div className='qrcode-wrapper'>
         <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          onLoad={this.handleLoad}
          style={{ width: '100%' }}
          />  
          </div>         
        }

        { !this.state.showWelcomeScreen && this.state.showMP3Player && 
          <>
          <div className='player-wrapper'>
          <ReactPlayer 
            width='100%'
            height='100%'
            autoPlay
            ref={this.ref}
            url={url}     
            onEnded={this.handleAfterEnd}           
            playing={playing}       
            muted={muted}       
            controls={controls}                    
            onPlay={this.onPlay}             
            onPause={this.onPause}
            onProgress={this.onProgress}          
            onError={this.onError}          
                
          />    
          <div className="audioButton"> 
           <button className="button" onClick={this.handleAfterEnd}>Back</button>
            <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
            <button className="button" onClick={this.handleAfterEnd}>Stop</button>
            <button className="button" onClick={this.handleRestart}>Re-start</button>
            </div>
          </div>
           
          </>
        }
        </Layout>
        )
    }
}

export default Test