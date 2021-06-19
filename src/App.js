import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Components/Weather';
import Movies from './Components/Movies';




class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      lat: '',
      lon: '',
      weatherData: [],
      displayData: false,
       moviesData: '',
       moviesStatus: false
      

    }
  };

  updateCityNameState = (e) => {
    
    this.setState({
      cityName: e.target.value
    });
  }

  getCityData = async (e) => {
    e.preventDefault();
    await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.8269ff735eee1becb57a1e949f9d6420&city=${this.state.cityName}&format=json`).then(locationResponse => {

      this.setState({
        cityData: locationResponse.data[0],
        lat: locationResponse.data[0].lat,
        lon: locationResponse.data[0].lon,
      });
    } );
       axios.get(`${process.env.REACT_APP_URL}/weather?lat=${this.state.lat}&lon=${this.state.lon}`).then(weatherResponse => {
        this.setState({
          weatherData: weatherResponse.data,
          displayData: true
        })
      } );

      axios.get(`${process.env.REACT_APP_URL}/movie?&query=${this.state.cityName}`).then (moviesData =>{

        this.setState({
          moviesData: moviesData.data,
         
          moviesStatus: true
        });
        console.log(moviesData);
  
      } )
     
     
   

  }




  render() {
    return (
      <div>
       
          <Form onSubmit={this.getCityData}>
          <Form.Group className="mb-3" controlId="write the location ">
            <Form.Label>city explorer</Form.Label>
            <Form.Control type="text" placeholder="write the location" onChange={this.updateCityNameState}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Button  variant="primary" type="submit">
            exploer
          </Button>
          </Form>  

      
          {this.state.displayData && 
          
        <Card style={{ width: '18rem' }}>
          
        <Card.Img variant="top"  src= {`https://maps.locationiq.com/v3/staticmap?key=pk.8269ff735eee1becb57a1e949f9d6420&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=20`} alt='display Map' alt='' />
        <Card.Body>
          <Card.Title>    <p> {this.state.cityData.display_name}</p> </Card.Title>
          <Card.Text>
          <p> {this.state.cityData.display_name}</p>
          </Card.Text>
        </Card.Body>
      </Card>  
          }

                  {/* {this.state.weatherData.map(weatherObj => {
                return (
                  <>
                    <p>
                      {weatherObj.description}
                    </p>
                    <p>
                      {weatherObj.date}
                    </p>
                  </>
                )
              })
            } */}

            {this.state.displayData &&
              <Weather
                weatherData={this.state.weatherData}

              />
            }
             {this.state.moviesStatus &&
                  <Movies
                    moviesData={this.state.moviesData}
                  />

                }
      </div>
    

      )
      
     }
  
}

export default App