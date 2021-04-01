import React from 'react'

const DeletedFlag = ({ isDeleted }) => isDeleted ? <span className="deleted">(удален)</span> : null

export default DeletedFlag
