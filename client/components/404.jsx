import React from 'react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  return (
    <div className="container main-wrapper aligner">
      <br />
      <div className="aligner-item text-center ">
        {/* <h1 className="display-1">404</h1>
        <p className="lead text-gray-800 mb-5">Page Not Found</p> */}
        <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
        <br />
        <button
          className="btn btn-secondary btn-lg font-bold"
          type="button"
          tabIndex="0"
          onClick={() => {
            history.push('/')
          }}
        >
          {' '}
          Back to Main page
        </button>
        <br />
        <br />
        <div>
          <img alt="wave" src="images/404.png" className="center block m-auto" />
        </div>
      </div>
    </div>
  )
}

export default NotFound
