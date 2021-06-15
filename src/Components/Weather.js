import react from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

class Weather extends react.Component {

    render() {
        return (
            <div>
               
            <ListGroup style={{'margin-top': '7%' , color: 'blue'}}>
            <h2 style={{'text-align':'center'}}>Weather</h2>
            {
    this.props.weatherData.map(weatherObj => {
        return <ListGroup.Item>{weatherObj.description}<br></br>{weatherObj.date}</ListGroup.Item>
        })}

            </ListGroup>
            
            </div> 
        )
    }

}





export default Weather;
