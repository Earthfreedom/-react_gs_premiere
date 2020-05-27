import React from 'react';
import Booklist from './components/booklist'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from 'axios';
import Grobe from './components/grobe';
import CeciumFlight from './components/cecium';
// import axiosJsonpAdapter from 'axios-jsonp';

const getDataFromAPI = async keyword => {
  const requestUrl = 'https://www.googleapis.com/books/v1/volumes?q=intitle:'
  const result = await axios.get(`${requestUrl}${keyword}`);
  console.log(result)
  return result;
}

const getDataFromFlightAPI = async howmany => {
  const requestUrl = 'http://localhost:3001/auth/'
  const result = await axios.post(requestUrl, {
    howmany: howmany
  })
  console.log(result)
  return result;
}

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

// 無理矢理取得しようとしたけどキモいのでやめた
// const getDataFromFlightAPI = async keyword => {
//   const username = 'process.env.REACT_APP_FLIGHTAEARE_USER_NAME'
//   const password = 'process.env.REACT_APP_FLIGHTAEARE_API_KEY'
//   const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
//   const requestUrl = 'https://flightxml.flightaware.com/json/FlightXML2/'
//   const result = await axios.get(`${requestUrl}${keyword}`, {
//     // headers: { "Content-Type": "application/json" },
//     adapter: axiosJsonpAdapter,
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Basic ${token}`,
//       'Access-Control-Allow-Origin': '*'
//     },
//     data: {
//       query: { airport: 'KAUS', howMany: 1 }
//     }
//   })
//     .then(response => {
//       console.log(response.data.contents);
//     });;
//   return result;
// }



const App = () => {
  const languages = ['React', 'Vue', 'Angular'];
  return (
    <BrowserRouter>
      <div>
        <h1>Reactで航空機の位置情報を3D地球儀の上にピン立てるアプリ</h1>
        <ul>
          <li><Link to='/'>React</Link></li>
          <li><Link to='/vue'>Vue</Link></li>
          <li><Link to='/angular'>Angular</Link></li>
          <li><Link to='/grobe'>grobe（使おうとしたけどズームすると荒いので嫌いだった）</Link></li>
          <li><Link to='/cecium'>cecium（ズームしても綺麗好き）</Link></li>
        </ul>
        <hr />
        <Route
          exact path='/'
          render={props =>
            <Booklist
              language={languages[0]}
              getData={keyword => getDataFromAPI(keyword)}
            />
          }
        />
        <Route
          exact path='/vue'
          render={props =>
            <Booklist
              language={languages[1]}
              getData={keyword => getDataFromAPI(keyword)}
            />
          }
        />
        <Route
          exact path='/angular'
          render={props =>
            <Booklist
              language={languages[2]}
              getData={keyword => getDataFromAPI(keyword)}
            />
          }
        />
        <Route
          exact path='/grobe'
          render={props =>
            <Grobe />
          }
        />
        <Route
          exact path='/cecium'
          render={props =>
            <CeciumFlight
              howmany={15}
              getData={howmany => getDataFromFlightAPI(howmany)}
            />
          }
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
