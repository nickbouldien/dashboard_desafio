import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Dashboard from '../components/Dashboard';
import { getWeather, getStock, getCurrency, attachToLane, applicationError } from '../actions/actionCreators';

const mapStateToProps = (state) => ({
  weather: state.weather,
  stockData: state.stockReducer,
  currencyData: state.currencyReducer,
  error: state.errors,
  searchTerm: state.inputReducer.searchTerm,
  lanes: state.laneReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getWeatherForCity(query, units, laneId, cardId, type) {
    dispatch(getWeather(query, units, laneId, cardId, type));
  },
  getStockInfo(stock, laneId, cardId, type) {
    dispatch(getStock(stock, laneId, cardId, type));
  },
  getCurrencyInfo(currencySymbol, laneId, cardId, type) {
    dispatch(getCurrency(currencySymbol, laneId, cardId, type));
  },
  attachToLane(targetPropsLaneId, sourceId) {
    dispatch(attachToLane(targetPropsLaneId, sourceId));
  },
});


const DashboardContainer = compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);

export default DashboardContainer;
