import react from 'react';
import ListGroup from 'react-bootstrap/ListGroup'

class Weather extends react.Component {

    render() {
        return (
            <div>
               
            <ListGroup style={{'margin-top': '7%'}}>
            <h2 style={{'text-align':'center'}}>WITHER</h2>
            {
    this.props.weatherData.map(weatherObj => {
        return <ListGroup.Item>{weatherObj.data.description}{weatherObj.date}</ListGroup.Item>
        })}

            </ListGroup>
            </div>
        )
    }

}





export default Weather;
