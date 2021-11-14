import React from 'react'

function Card({data}) {
    return (
        <div>
            <div className="card my-3">
                <h5 className="card-header">{data.username}</h5>
                <div className="card-body">
                    <p className="card-text">{data.text}</p>
                </div>
            </div>

        </div>
    )
}

export default  React.memo(Card)
