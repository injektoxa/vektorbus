import React from 'react'

const Component = (props) => {
  const deleteClientTrip = () => {
    props.setSelectedRowId(props.rowId);
    props.deleteClientTrip(props.Id);
    setTimeout(() => {
      props.updateExpandedRow(props.rowId);
      props.addToast('Клиент удален из маршрута', 'success');
    }, 2000);
  }
  return (
    <tr>
      <td> {props.Id}</td>
      <td> {props.Name}</td>
      <td> {props.Phone}</td>
      <td> {props.HasDiscount}</td>
      <td> {props.Comments}</td>
      <td> {props.Price}</td>
      <td> {props.AgentName}</td>
      <td> {props.AgentPrice}</td>
      <td> {`${props.From} --> ${props.To}`}</td>
      <td> {props.IsStayInBus ? <i className="fa fa-bus" aria-hidden="true"></i> : ''}</td>
      <td> {props.HasBaggage ? <i className="fa fa-suitcase" aria-hidden="true"></i> : ''}</td>
      <td> {props.HasMinorChild ? <i className="fa fa-child" aria-hidden="true"></i> : ''}</td>
      <td> {props.HasDisability ? <i className="fa fa-wheelchair" aria-hidden="true"></i> : ''}</td>
      <td><button onClick={deleteClientTrip} className="btn btn-warning">Удалить</button></td>
    </tr>
  )
}

export default Component
