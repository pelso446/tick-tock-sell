import React, { Component } from 'react';

class CreateAuction extends Component {
  render() {
    return (
      <div className='auction'>
        <div className='header'>
          <form>
            <br />
            <input placeholder='Beskrivning' />
            <br />
            <br />
            <input placeholder='Pris' />
            <br />
            <button type='submit'> Add item </button>
          </form>
        </div>
      </div>
    );
  }
}
export default CreateAuction;
