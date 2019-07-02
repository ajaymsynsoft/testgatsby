import React, {
    Component
} from "react"

import Layout from "../components/layout"
import ReactPlayer from 'react-player'
import audioList from "../components/config"
const queryString = require('query-string');
var QrReader = '';

class IndexPage extends Component {
    /**
        * Manage State For player and QR reader.        
    */
    state = {
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
    /**
        * Load component after page ready.
        * QR code reader
    */
    componentDidMount() {
        var parsed = queryString.parse(this.props.location.search);
        try {
            if (navigator.onLine) {
                audioList.map(r => {                   
                    const audio = new Audio();
                    audio.src = r;
                    return r;
                });

            }
            QrReader = require("react-qr-reader");
            if (parsed && !!parsed.pwa) {
                this.setState({ showWelcomeScreen: false });
            }
            this.setState({ QrReader: true });
        } catch (e) {
            console.error(e);
        }
    }

    /**
        * Play and Pause event.        
    */
    playPause = () => {
        this.setState({ playing: !this.state.playing })
    }

    /**
        * After whole played audio and stop button open QR reader view.        
    */

    handleAfterEnd = data => {
        this.setState({
            url: '',
            showQrReader: true,
            showMP3Player: false,
            showWelcomeScreen: false,
            playing: false
        })
    }

    /**
        * Restart Audio player .        
    */

    handleRestart = data => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(0))
        this.setState({ seeking: true })
    }

    /**
        * Handle Scan QR code and if match with config file play audio.        
    */

    handleScan = url => {
        console.log(url);
        if (typeof url == 'string') {
            url = url.toLowerCase();
            if (audioList.indexOf(url) > -1) {
                this.setState({
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

    /**
        * Load QR code reader and play audio file.        
    */

    handleLoad = url => {
        if (typeof url == 'string') {
            url = url.toLowerCase();
            if (audioList.indexOf(url) > -1) {
                this.setState({
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

    /**
        * Set state on progress playing audio file.        
    */

    onProgress = state => {
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
        console.error(err)
    }

    /**
        * Handle Error while playing audio file.     
    */

    onError = err => {
        alert("You are offline. For this QR code please go online.");
        this.setState({
            url: '',
            showQrReader: true,
            showMP3Player: false,
            showWelcomeScreen: false,
            playing: false
        })
    }

    /**
        * Render camera and player view.     
    */
    render() {
        const { url, playing, controls, muted } = this.state
        return (
            <Layout>  
                { this.state.showWelcomeScreen  &&    
                   <div
                      style={{
                        margin: `0 auto`,
                        maxWidth: 960,
                        padding: `1.45rem 1.0875rem`,
                      }}
                    >
                    <h1>Welcome.....</h1>
                    <p>Please  <button className="button" onClick={this.handleAfterEnd}>click here</button> to scan QR code.</p>
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

export default IndexPage