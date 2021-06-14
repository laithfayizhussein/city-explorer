import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Components/Weather';



class App extends React.Component {

  constructor (props){
    super (props);
    this.state = {
      searchQuery:'' ,
      locData: '' ,
      status: false,
      show : false ,
      weatherData: []

    }
  }

  updatSearch = (e)=>{
    this.setState({
      searchQuery: e.target.value
  
    })
    console.log(this.state.searchQuery);
  }

getLocation = async (e) => {
  e.preventDefault();
  
  let locUrl =(`https://us1.locationiq.com/v1/search.php?key=pk.8269ff735eee1becb57a1e949f9d6420&q=${this.state.searchQuery}&format=json`)
  let locResult = await axios.get(locUrl);
  let weatherData = await axios.get(`https://city-explorer-laith.herokuapp.com/`)

  this.setState({
    locData:locResult.data[0] ,
    show : true  ,
    status: true,

    weatherData: weatherData.data.data

   });
}





  render() {
    return (
      <div>
       
          <Form onSubmit={this.getLocation}>
          <Form.Group className="mb-3" controlId="write the location ">
            <Form.Label>city explorer</Form.Label>
            <Form.Control type="text" placeholder="write the location" onChange={this.updatSearch}/>
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Button onClick={this.getLocation} variant="primary" type="submit">
            exploer
          </Button>
        </Form>
      
          {this.state.show && 
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top"  src= {` https://maps.locationiq.com/v3/staticmap?key=pk.8269ff735eee1becb57a1e949f9d6420&q&center=${this.state.locData.lat},${this.state.locData.lon}&zoom=1-18`} alt='display Map'alt='' />
        <Card.Body>
          <Card.Title>          <p>{this.state.locData.display_name}</p>
</Card.Title>
          <Card.Text>
          <p>{this.state.locData.display_name}</p>

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
