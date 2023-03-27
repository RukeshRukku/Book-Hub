import './index.css'

const BookShelvesList = props => {
  const {details, click, check} = props
  const {value, label, id} = details
  const change = () => {
    click(id, value, label)
  }
  const className = check ? 'change-color-btn' : ''
  const className2 = check ? 'design-btn' : ''
  return (
    <li>
      <button
        type="button"
        className={`btn-li ${className} ${className2} color-button`}
        onClick={change}
      >
        {label}
      </button>
    </li>
  )
}

export default BookShelvesList
