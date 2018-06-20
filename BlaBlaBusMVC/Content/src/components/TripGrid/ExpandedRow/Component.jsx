import React from 'react';
import ClientTrip from './ClientTrip';

export const Component = (props) => {
  const addNewClientClicked = () => {
    props.setSelectedRowId(props.id);
    props.toggleDialog();
  }
  return (
    <div>
      <button onClick={addNewClientClicked} className="btn btn-default">Добавить клиента</button>
      <button className="btn btn-default">Сформировать рейс</button>
      <table className='table table-condensed'>
        <thead>
          <tr>
            <td> № </td>
            <td> Клиент </td>
            <td> Телефон </td>
            <td> Скидка </td>
            <td>Комментарий клиента </td>
            <td> Цена </td>
            <td>Агент </td>
            <td> Цена агента </td>
            <td className='thRoute'> Маршрут </td>
            <td> Не выходит </td>
            <td> Багаж </td>
            <td> Ребенок </td>
            <td> Инвалид </td>
            <td> </td>
          </tr>
        </thead>
        <tbody>
          {props.tripClients.map(i => <ClientTrip
            updateExpandedRow={props.updateExpandedRow}
            {...i}
            rowId={props.id}
            key={i.Id}
            setSelectedRowId={props.setSelectedRowId}
          />)}
        </tbody>
      </table>
    </div>);
}

export default Component