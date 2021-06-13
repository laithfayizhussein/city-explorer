import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {

  constructor (props){
    super (props);
    this.state = {
      searchQuery:'' ,
      locData: ''
    }
  }


getLocation = async (e) => {
  e.preventDefault();
  let locUrl =(`https://us1.locationiq.com/v1/search.php?key=pk.8269ff735eee1becb57a1e949f9d6420&q=${this.state.searchQuery}&format=json`)
  let locResult = await axios.get(locUrl);
  this.setState({
    locData:locResult.data[0]
   });
}

updatSearch = (e)=>{
  this.setState({
    searchQuery: e.target.value

  })
  console.log(this.state.searchQuery);
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


        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top"  src= {`https://maps.locationiq.com/v3/staticmap?key=pk.8269ff735eee1becb57a1e949f9d6420
&center=${this.state.locData.lat} , ${this.state.locData.lon}&zoom=10`} alt='' />
        <Card.Body>
          <Card.Title>          <p>{this.state.locData.display_name}</p>
</Card.Title>
          <Card.Text>
          <p>{this.state.locData.display_name}</p>

          </Card.Text>
        </Card.Body>
      </Card>
  
      </div>
      )
     }
  
}

export default App
