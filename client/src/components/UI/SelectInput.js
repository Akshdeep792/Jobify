const FormRowSelect = (props) => {
    return (
      <div className='form-row'>
        <label htmlFor={props.name} className='form-label'>
          {props.labelText || props.name}
        </label>
  
        <select
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          className='form-select'
        >
          {props.list.map((itemValue, index) => {
            return (
              <option key={index} value={itemValue}>
                {itemValue}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
  
  export default FormRowSelect