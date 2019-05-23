import React from 'react';
import Loader from 'react-loader-spinner';

const style = {
  style: {
    display: 'flex',
    justifyContent: 'center'
  }
};

export default class App extends React.Component {
  render() {
    return (
      <div {...style} className='testtest'>
        <Loader type='Triangle' color='#00BFFF' height='100' width='100' />
      </div>
    );
  }
}
