'use strict';

const changeWaterPercentage = percentage => ({
    type: 'WATER_PERCENTAGE',
    percentage: percentage
});

const changeInitialWeight = weight => ({
    type: 'INITIAL_WEIGHT',
    weight: weight
});


const initialState = {
    initialWeight: 100,
    waterPercentage: 99,
    resultWeight: 100
}

class Watermelon extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
        store.subscribe(() => {
            this.setState(store.getState());
        });
    }

    render() {
        return (
            <div>
                <h1>Вес после усыхания: {this.state.resultWeight} кг.</h1>
                <div className="watermelon-container">
                    <div className="watermelon">
                        <div className="watermelon__outer" style={{ width: 100 * (this.state.initialWeight / 100) + 'px', height: 100 * (this.state.initialWeight / 100) + 'px' }}>
                            <div className="watermelon__inner" style={{ width: this.state.waterPercentage + '%', height: this.state.waterPercentage + '%' }}></div>
                        </div>
                    </div>
                    <div className="controls">
                        <div className="control control--left">
                            <p className="control__title">Процент воды после усыхания:<br />{this.state.waterPercentage + '%'}</p>
                            <input onChange={evt => (this.props.changeWaterPercentage(evt.target.value))} type="range" min="0" max="99" step="1" className="control__input water-percentage-range" />
                        </div>
                        <div className="control control--bottom">
                            <p className="control__title">Начальный вес арбуза:<br />{this.state.initialWeight + 'кг.'}</p>
                            <input onChange={evt => (this.props.changeInitialWeight(evt.target.value))} type="range" min="1" max="200" step="1" className="control__input initial-weight-range" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    changeWaterPercentage: val => {
        dispatch(changeWaterPercentage(val))
    },
    changeInitialWeight: val => {
        dispatch(changeInitialWeight(val))
    }
});

const watermelonReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'WATER_PERCENTAGE':
            action.percentage = parseInt(action.percentage, 10);
            state.waterPercentage = action.percentage;
            state.resultWeight = Math.round(state.initialWeight * ((action.percentage + 1) / 100));
            return state;
        case 'INITIAL_WEIGHT':
            action.weight = parseInt(action.weight, 10);
            state.initialWeight = action.weight;
            state.resultWeight = Math.round(action.weight * ((state.waterPercentage + 1) / 100));
            return state;
        default:
            return state;
    }
}


const store = createStore(watermelonReducer);

const ConnectedApp = connect(null, mapDispatchToProps)(Watermelon);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.querySelector('#container'));

document.querySelectorAll('.initial-weight-range')[0].value = "100";
document.querySelectorAll('.water-percentage-range')[0].value = "99";