import { AfterViewInit, Component } from '@angular/core';
import Graph from 'graphology';
import Sigma from 'sigma';
import circular from 'graphology-layout/circular';

const ACCOUNTS_DATA = [
  {
    AccountID: '6534454617',
    OwnerName: 'افسر',
    OwnerLastName: 'طباطبایی',
  },
  {
    AccountID: '4000000028',
    OwnerName: 'ایرج',
    OwnerLastName: 'مددی',
  },
  {
    AccountID: '3000000406',
    OwnerName: 'ترانه',
    OwnerLastName: 'برزگری',
  },
  {
    AccountID: '4000000290',
    OwnerName: 'ترمه',
    OwnerLastName: 'نصیری',
  },
  {
    AccountID: '6039548046',
    OwnerName: 'ارژنگ',
    OwnerLastName: 'مرتضوی',
  },
];

const TRANSACTIONS_DATA = [
  {
    SourceAcount: '6534454617',
    DestiantionAccount: '6039548046',
    TransactionID: '153348811341',
  },
  {
    SourceAcount: '6039548046',
    DestiantionAccount: '5287517379',
    TransactionID: '192524206627',
  },
  {
    SourceAcount: '6039548046',
    DestiantionAccount: '5718373092',
    TransactionID: '113480622054',
  },
  {
    SourceAcount: '6039548046',
    DestiantionAccount: '9862369812',
    TransactionID: '114556773378',
  },
  {
    SourceAcount: '5287517379',
    DestiantionAccount: '1205418051',
    TransactionID: '185136982986',
  },
];

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss',
})
export class ChartsComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.visualizeGraph();
  }

  private visualizeGraph(): void {
    const graph = new Graph();

    // Add nodes from ACCOUNTS_DATA
    ACCOUNTS_DATA.forEach((account) => {
      graph.addNode(account.AccountID, {
        label: `${account.OwnerName} ${account.OwnerLastName}`,
        size: 10,
        color: '#00f',
      });
    });

    // Add edges from TRANSACTIONS_DATA
    TRANSACTIONS_DATA.forEach((transaction) => {
      if (
        graph.hasNode(transaction.SourceAcount) &&
        graph.hasNode(transaction.DestiantionAccount)
      ) {
        graph.addEdge(
          transaction.SourceAcount,
          transaction.DestiantionAccount,
          {
            label: `Transaction ${transaction.TransactionID}`,
            color: '#f00',
          }
        );
      }
    });

    // Apply the circular layout
    circular.assign(graph);

    // Initialize Sigma with the graph and container
    const container = document.getElementById('sigma-container')!;
    const sigmaInstance = new Sigma(graph, container);

    // Additional interactions or configurations can be added here
  }
}
