import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Components/Weather';



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
      axios.get(`${process.env.REACT_APP_URL}?lat=${this.state.lat}&lon=${this.state.lon}`).then(weatherResponse => {
        this.setState({
          weatherData: weatherResponse.data,
          displayData: true
        })

      });
    });

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
          <Button onClick={this.getCityData} variant="primary" type="submit">
            exploer
          </Button>
        </Form>
      
          {this.state.show && 
          
        <Card style={{ width: '18rem' }}>
          
        <Card.Img variant="top"  src= {`https://maps.locationiq.com/v3/staticmap?key=pk.8269ff735eee1becb57a1e949f9d6420&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=1-18`} alt='display Map'alt='' />
        <Card.Body>
          <Card.Title>    <p> {this.state.cityData.display_name}</p> </Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
      </Card>    
          }

            {this.state.status &&
              <Weather
                weatherData={this.state.weatherData}
              />
            }

      </div>
    

      )
     }
  
}

export default App