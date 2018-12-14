import React from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const sampleData = {
  columnDefs: [
    {headerName: 'RIC', field: 'ric', width: 70},
    {headerName: 'Account', field: 'firmAccount', width: 80},
    {headerName: 'Side', field: 'side', width: 60},
    {headerName: 'Qty', field: 'quantity', width: 80},
    {headerName: 'market', field: 'market', width: 60},
  ],
  rowData: [
    {
      ric: '200 HK',
      firmAccount: 'EJKSDH',
      side: 'SSS',
      quantity: -708023,
      market: 'SPH',
    },
    {
      ric: '200 HK',
      firmAccount: 'EJKSDH',
      side: 'SSS',
      quantity: -708023,
      market: 'SPH',
    },
    {
      ric: '200 HK',
      firmAccount: 'EJKSDH',
      side: 'SSS',
      quantity: -708023,
      market: 'SPH',
    },
  ],
};

export class RecallPage extends React.Component {
  constructor (props) {
    super (props);
    this.toggleDetails = this.toggleDetails.bind (this);
    this.onGridReady = this.onGridReady.bind (this);

    this.state = {
      items: [
        {
          title: 'Recall',
          ...sampleData,
        },
        {
          title: 'SSSS Position',
          ...sampleData,
        },
        {
          title: 'PPPPP Position',
          columnDefs: [
            {headerName: 'Book', field: 'book', width: 60},
            {headerName: 'Synth ', field: 'syn', width: 70},
            {headerName: 'Qty', field: 'quantity', width: 70},
          ],
          rowData: [
            {book: 'Toyota', syn: 'Celica', quantity: 35000},
            {book: 'Ford', syn: 'Mondeo', quantity: 32000},
            {book: 'Porsche', syn: 'Boxter', quantity: 72000},
          ],
        },
      ],
      data: [
        {code: '600 HK', clientAccount: 'client account', qty: 20},
        {code: '600 HK', clientAccount: 'client account', qty: 20},
        {code: '600 HK', clientAccount: 'client account', qty: 20},
      ],
      rowStatus: {},
    };
    this.grids = {};
  }

  onGridReady (params, index) {
    console.log (params, index);
    this.grids[index] = {
      api: params.api,
      columnApi: params.columnApi,
    };
    // params.columnApi.autoSizeColumns ();
    // var allColumnIds = [];
    // params.columnApi.getAllColumns ().forEach (function (column) {
    //   allColumnIds.push (column.colId);
    // });
    // params.columnApi.autoSizeColumns (allColumnIds);
  }

  toggleDetails (index) {
    if (index >= 0) {
      const currentStatus = _.get (
        this.state.rowStatus[index],
        `showDetails`,
        false
      );
      this.setState (
        _.merge ({}, this.state, {
          rowStatus: {
            [index]: {
              showDetails: !currentStatus,
            },
          },
        })
      );
      // setTimeout (() => {
      //   _.values (this.grids).slice (0, 1).map ((grid, index) => {
      //     console.log (grid, index);
      //     grid.columnApi.autoSizeColumns ();
      //     const allColumnIds = [];
      //     grid.columnApi.getAllColumns ().forEach (function (column) {
      //       allColumnIds.push (column.colId);
      //     });
      //     grid.columnApi.autoSizeColumns (allColumnIds);
      //   });
      // }, 1000);
    }
  }

  render () {
    const data = this.state.data;
    const rowStatus = this.state.rowStatus;
    return (
      <section className="recall-page">
        <div className="list">
          <div className="item">
            <div className="item-header">
              <div className="input">
                <div className="input-symbol">Code</div>
                <div className="input-client-account">
                  Account
                </div>
                <div className="input-quantity">Quantity</div>
              </div>
              <div className="action">
                <button onClick={() => this.toggleDetails (-1)}>
                  Toggle All
                </button>
              </div>
            </div>
            <div />
          </div>
          {data.map ((item, index) => {
            const displayDetails = _.get (
              rowStatus[index],
              `showDetails`,
              false
            );
            return (
              <div className="item" key={index}>
                <div
                  className="item-header"
                  onClick={() => this.toggleDetails (index)}
                >
                  <div className="input">
                    <div className="input-symbol">{item.code}</div>
                    <div className="input-client-account">
                      {item.clientAccount}
                    </div>
                    <div className="input-quantity">{item.qty}</div>
                  </div>
                  <div className="action">
                    <button onClick={() => this.toggleDetails (index)}>
                      Toggle
                    </button>
                  </div>
                </div>
                <div
                  className={`item-details ${displayDetails ? 'show' : 'hide'}`}
                >
                  {this.state.items.map ((details, detailsIndex) => {
                    return (
                      <div className="grid" key={detailsIndex}>
                        <h4>{details.title}</h4>
                        <div className="ag-theme-balham ag-grid">
                          <AgGridReact
                            columnDefs={details.columnDefs}
                            rowData={details.rowData}
                            onGridReady={params => {
                              this.onGridReady (params, index);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        </div>
      </section>
    );
  }
}
