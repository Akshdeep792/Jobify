const Input = (props) => {
    return (
      <div className='form-row'>
        <label htmlFor={props.name} className='form-label'>
          {props.labelText || props.name}
        </label>
  
        <input
          type={props.type}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
          ref = {props.ref}
          className='form-input'
        />
      </div>
    )
  }
  
  export default Input