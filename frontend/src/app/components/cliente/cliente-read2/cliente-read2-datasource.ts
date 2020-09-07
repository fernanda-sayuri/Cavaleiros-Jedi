import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Cliente } from '../cliente.model';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Cliente[] = [
  {id: 1, nome: 'Hydrogen', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 2, nome: 'Helium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 3, nome: 'Lithium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 4, nome: 'Beryllium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 5, nome: 'Boron', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 6, nome: 'Carbon', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 7, nome: 'Nitrogen', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 8, nome: 'Oxygen', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 9, nome: 'Fluorine', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 10, nome: 'Neon', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 11, nome: 'Sodium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 12, nome: 'Magnesium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 13, nome: 'Aluminum', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 14, nome: 'Silicon', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 15, nome: 'Phosphorus', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 16, nome: 'Sulfur', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 17, nome: 'Chlorine', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 18, nome: 'Argon', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 19, nome: 'Potassium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"},
  {id: 20, nome: 'Calcium', idade: 19, cpf: 83187, tel: 8237, email: "fefe@gmail.com"}
];

/**
 * Data source for the ClienteRead2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ClienteRead2DataSource extends DataSource<Cliente> {
  data: Cliente[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;
  filter: string;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Cliente[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Cliente[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Cliente[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.nome, b.nome, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
