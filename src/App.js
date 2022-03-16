
import React, { Component } from 'react';
import './App.css';
// import Clarifai from 'clarifai' ;
import Navigation from './components/navigation/navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';

// const app = new Clarifai.App({
//   apiKey: 'ef7a1ea9f0a944f8a61eb7b4a9d571a6'
//  });

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined:  ''
  }
}
class App extends Component {
  constructor(){  
    super();
    this.state = initialState; 
  }

  loaadUser = (data) => {
    this.setState({ user: {

        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined:  data.joined
    }
  })
  }

  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // }

  calculateFaceLoc = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  } 

  displayFaceBox = (box) => {
    this.setState({box: box});
  }
  
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); 
    // app.models.predict(
    //   Clarifai.FACE_DETECT_MODEL,
    //   this.state.input)
    fetch('https://whispering-woodland-28994.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      // console.log('hi', response)
      if (response) {
        fetch('https://whispering-woodland-28994.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        // .then(responsee => responsee.json())
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })

      }
      this.displayFaceBox(this.calculateFaceLoc(response))
    })
    .catch(err => console.log(err))
  }
/*
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input}); 
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
       this.state.input
      // "a403429f2ddf4b49b307e318f00e528b",
      // "https://samples.clarifai.com/face-det.jpg"
    ).then(
      // response => this.calculateFaceLoc(respnse); in place of below format
      function(response){
        // console.log(response);
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.calculateFaceLoc(response);
      },
      function(err){
        //
      }
    )
  }*/

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    } 
    this.setState({route: route});

  }

   
  render(){
    // const {isSignedIn, imageUrl, route, box} = this.state; can remove this.state from below now
    return (
        <div className="App">
          <ParticlesBg type="cobweb" bg={true} />
          
          <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          {
                this.state.route === 'home' 
                  ? <div>
                  <Logo />
                  <Rank name = {this.state.user.name} entries = {this.state.user.entries}/>
                  <ImageLinkForm 
                  onInputChange = {this.onInputChange}
                   onButtonSubmit = {this.onButtonSubmit}/>
                  <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
              </div> 
              :(
                this.state.route === 'signin'
                ?<Signin loaadUser = {this.loaadUser} onRouteChange = {this.onRouteChange}/>
                :<Register loaadUser = {this.loaadUser} onRouteChange = {this.onRouteChange}/>
                ) 
          
          }
        </div>
      );
    }
  }       

//   render(){
//   return (
//       <div className="App">
//         <ParticlesBg type="cobweb" bg={true} />
        
//         <Navigation onRouteChange={this.onRouteChange}/>
//         {
//         this.state.route =='signin' 
//           ? <Signin onRouteChange = {this.onRouteChange}/>
//           : <div>
//               <Logo />
//               <Rank />
//               <ImageLinkForm 
//               onInputChange = {this.onInputChange}
//               onButtonSubmit = {this.onButtonSubmit}/>
//               <FaceRecognition box={this.state.box} imageUrl = {this.state.imageUrl}/>
//           </div>
//         }
//       </div>
//     );
//   }
// }          

export default App;
 