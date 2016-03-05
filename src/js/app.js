import * as React from 'react';
import { Flux, Component } from 'flumpt';
import { render } from 'react-dom';


class CounterComponent extends Component {
  render() {
    return (
      <div>
        <p>count: {this.props.count}</p>
        <div>
          <button onClick={() => this.dispatch('increment')}>+1</button>
          <button onClick={() => this.dispatch('decrement')}>-1</button>
        </div>
      </div>
    );
  }
}


class App extends Flux {
  subscribe() {
    this.on('increment', () => {
      this.update(({count}) => {
        return { count: count + 1 };
      });
    });

    this.on('decrement', () => {
      this.update(({count}) => {
        return {count: count - 1};
      });
    });
  }

  render(state) {
    return <CounterComponent {...state}/>;
  }
}


const app = new App({
  renderer: el => {
    render(el, document.querySelector('#app'));
  },
  initialState: {count: 0},
  middlewares: [
    // logger
    (state) => {
      console.log(state);
      return state;
    }
  ]
});

app.update(_initialState => (_initialState));
