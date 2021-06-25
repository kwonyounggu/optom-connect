import React, { Component } from 'react';
import { render } from 'react-dom';
import A from './index.jsx';

//https://stackblitz.com/edit/react-material-ui-tabs?file=index.js
class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      index: 0
    };
  }

  render() {
    return (
      <div>
        <p>
          Start editing to see some magic happen :)
        </p>

        <A.Tabs value={this.state.index} onChange={(_, index) => this.setState({index})}>
          <A.Tab title="Janeiro" subtitle="01/2020" />
          <A.Tab title="Janeiro" subtitle="01/2020" />
          <A.Tab title="Janeiro" subtitle="01/2020" />
        </A.Tabs>

        <div>div comum para todos</div>

        <A.TabContent value={this.state.index} index={0}>
          oia onis aqui 1
        </A.TabContent>
        <A.TabContent value={this.state.index} index={1}>
          oia onis aqui 2
        </A.TabContent>
        <A.TabContent value={this.state.index} index={2}>
          oia onis aqui 3
        </A.TabContent>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
