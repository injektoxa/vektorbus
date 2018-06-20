import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ExpandedRow from './ExpandedRow';
import Loader from '../Loader';
import ModalWindow from '../ModalWindow';
import tripClientForm from '../forms/AddClientTripModal';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import moment from 'moment';

const timeFormat = cell => moment(cell).format('LLL');
const expandableRow = () => true;

const expandCallback = (row) => {
  return row.isExpanded
    ? <i className="fa fa-caret-down" />
    : <i className="fa fa-caret-right" />;
}

const expandColumnOption = {
  expandColumnVisible: true,
  columnWidth: 40,
  expandColumnComponent: expandCallback,
};

export default class TripGrid extends React.PureComponent {
  state = {
    expandedRowIds: [],
    expandedId: '',
    loading: false,
  }

  componentWillMount() {
    this.props.getTripsData();
  }

  expandComponent = (row) => { // eslint-disable-line
    if (this.state.expandedRowIds.filter(el => el === row.id).length > 0) {
      return <ExpandedRow
        id={row.id}
        key={row.id}
        toggleDialog={this.props.toggleDialog}
        tripClients={this.state[row.id]}
        updateExpandedRow={this.updateExpandedRow}
        setSelectedRowId={this.setSelectedRowId}
      />;
    }
  };

  setSelectedRowId = (id) => {
    this.setState({
      expandedId: id,
    });
  }

  postClientTrip = (values) => {
    values.TripId = this.state.expandedId;
    this.props.postClientTripData(values);
    this.props.toggleDialog();
    setTimeout(() => {
      if (this.props.errors) {
        this.updateExpandedRow()
        this.props.addToast('Клиент добавлен к маршруту', 'success');
      } else {
        this.props.addToast('Произошла ошибка', 'error');
      }
    }, 2000);
  }

  updateExpandedRow = (id) => {
    this.callApi(id || this.state.expandedId)
      .then((res) => {
        this.setState({
          [this.state.expandedId]: res,
        });
      });
  }

  rowSelected = (row) => {
    this.setState({
      expandedId: row.id,
    });
    if (this.state[row.id] === undefined) {
      this.setState({
        loading: true,
      });
      this.callApi(row.id).then((res) => {
        this.setState({
          [row.id]: res,
          expandedRowIds: [...this.state.expandedRowIds, row.id],
          loading: false,
        });
      });
    }
  }

  callApi = (id) => {
    return fetch(`/api/trips/GetTripDetail?tripId=${id}`).then(res => res.json());
  }

  render() {
    const { loading } = this.state;
    const selectRow = {
      mode: 'checkbox',  // multi select
      onSelect: this.rowSelected,
      hideSelectColumn: true,
      clickToExpand: true,
      clickToSelect: true,
    };

    const options = {
      sortName: "id",  //default sort column name
      sortOrder: "desc",  //default sort order
    };

    return (
      <div style={{ position: 'relative' }} >
        {loading && <Loader />}
        < BootstrapTable
          search={true}
          data={this.props.trips}
          striped={true}
          hover={true}
          options={options}
          pagination
          selectRow={selectRow}
          expandableRow={expandableRow}
          expandColumnOptions={expandColumnOption}
          expandComponent={this.expandComponent}
        >
          <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>Номер рейса</TableHeaderColumn>
          <TableHeaderColumn dataField="date" dataFormat={timeFormat} dataSort={true}>Отправка</TableHeaderColumn>
          <TableHeaderColumn dataField="arrivalDate" dataFormat={timeFormat} dataSort={true} >Прибытие</TableHeaderColumn>
          <TableHeaderColumn dataField="cityFrom">Откуда</TableHeaderColumn>
          <TableHeaderColumn dataField="cityTo">Куда</TableHeaderColumn>
          <TableHeaderColumn dataField="driver">Водитель</TableHeaderColumn>
          <TableHeaderColumn dataField="comments">Коментарий</TableHeaderColumn>
        </BootstrapTable >
        <ModalWindow
          iconName='drive-time'
          title='Добавить клиента к маршруту'
          form='add-client-trip'
          formContent={tripClientForm}
          onSubmit={this.postClientTrip}
          bodyProps={{
            agents: this.props.agents,
            cities: this.props.cities,
            clients: this.props.clients,
          }}
        />
      </div >
    )
  }
}
