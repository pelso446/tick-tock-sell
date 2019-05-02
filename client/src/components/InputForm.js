import React from 'react';

class InputForm extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor='owner'>Owner</label>
        <input type='text' name='owner' id='owner' />
        <label htmlFor='description'>Description</label>
        <input type='text' name='description' id='description' />
        <button>Add new cat</button>
        <input type='submit' value='Submit' />
      </form>
    );
  }
}
export default InputForm;
