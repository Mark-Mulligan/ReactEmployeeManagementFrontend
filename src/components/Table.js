import React from "react";
import './Table.css'

class Table extends React.Component {
  renderTableHeaders() {
    return this.props.tableHeaders.map((header) => {
      return (
        <th scope="col" key={header}>
          {header}
        </th>
      );
    });
  }

  renderTableBody() {
    if (this.props.tableBodyData.length > 0) {
      return this.props.tableBodyData.map((item) => {
        return (
          <tr
            key={item.id}
            onClick={() => this.props.history.push(`${this.props.baseURL}/${item.id}`)}
            className="table-row"
          >
            {this.renderTableBodyRow(item)}
          </tr>
        );
      });
    }
  }

  renderTableBodyRow(item) {
    return this.props.tableBodyKeys.map((itemKey) => {
      return <td key={`${itemKey}-${item.id}`}>{item[itemKey]}</td>;
    });
  }

  render() {
    return (
      <table className="table">
        <thead className="thead-dark">
          <tr>{this.renderTableHeaders()}</tr>
        </thead>
        <tbody>{this.renderTableBody()}</tbody>
      </table>
    );
  }
}

export default Table;
