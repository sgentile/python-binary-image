import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function encode (input) {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;

  while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index 
      chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
          enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
          enc4 = 64;
      }
      output += keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);
  }
  return output;
}

class App extends Component {
  state = {
    result: "Welcome",
    images: []
  }
  getRandomImage = () => {
    axios.get('/api/v1/image', {responseType: 'arraybuffer'}).then(result => {
      var arrayBuffer = result.data;
      var bytes = new Uint8Array(arrayBuffer);
      var image = 'data:image/jpg;base64,' + encode(bytes);
      this.setState({
        images: [...this.state.images, image]
      })
      console.log(this.state.images)
    })
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
            <button onClick={() => this.getRandomImage()}>Generate Random Image</button>            
        </p>
        <div className="image-container">
          {this.state.images.map(image => 
            <img src={image}/>
          )}
        </div>
      </div>
    );
  }
}

export default App;
