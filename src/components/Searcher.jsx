import '../styles/searcher.css'

function Searcher(props) {
  return (
    <input
      ref={props.reference}
      className='character__searcher'
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder='Are you looking for someone?'
    />
  )
}

export default Searcher 
