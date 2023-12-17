import React, { ReactNode } from "react";

type TTaskValues = Record<string, string | number>;

type TTask = {
  nombreTarea: string;
  tarea: TTaskValues;
};

const TaskRowHead = ({ children }) => <tr>{children}</tr>;

const TaskTd = (props: { value: string | number }) => <td>{props.value}</td>;

const TaskRowBody = ({ children }) => <tr> {children} </tr>;

const TasksBody = ({ children }) => <tbody> {children} </tbody>;

const TasksTables = (props: { resultList: TTask[], keys: string[] }) => {
  const tableMannager = new TableMannager(props.keys);
  return <table>
    <thead>
      <TaskRowHead>{props.keys.map(x => <th>{x}</th>)}</TaskRowHead>
    </thead>
    {tableMannager.createTableBody(props.resultList)}
  </table>;
}


class TableMannager {
  #columnsNames: string[];
  #columnIndex: Record<string, number>;

  constructor(columnsNames: string[]) {
    this.columnsNames = columnsNames;
    this.columnIndex = columnsNames;
  };

  get columnsNames(): string[] {
    return this.#columnsNames;
  };

  set columnsNames(columns: string[]) {
    this.#columnsNames = columns;
  };

  get columnIndex(): Record<string, number> {
    return this.#columnIndex;
  };

  set columnIndex(columns: string[]) {
    this.#columnIndex = columns.reduce<Record<string, number>>((prev, current, idx) => {
      prev[current] = idx;
      return prev;
    }, {});
  };

  #itsPlaceDistance(row: ReactNode[], name: string): number {
    return Math.abs(row.length - this.columnIndex[name]);
  };

  #addColumnByName(name: string, row: ReactNode[], rowValues: TTaskValues): void {
    const n: number = this.#itsPlaceDistance(row, name);
    for (let i = 0; i <= n; i++) {
      row.push(<TaskTd value={i === n ? rowValues[name] : ''}></TaskTd>)
    }
  };

  #addRow(taskValues: TTaskValues): ReactNode {
    const row: ReactNode[] = [];
    for (const name of Object.keys(taskValues)) this.#addColumnByName(name, row, taskValues)

    if (row.length !== this.#columnsNames.length)
      for (let i = 0; i < this.#columnsNames.length - row.length; i++)
        row.push(<TaskTd value={""}></TaskTd>);
    return <TaskRowBody>{row}</TaskRowBody>;
  };

  #renderChildrens(resultList: TTask[]): ReactNode {
    return resultList.map(row => this.#addRow(row.tarea))
  };

  createTableBody(resultList: TTask[]) {
    return <TasksBody>{this.#renderChildrens(resultList)}</TasksBody>
  }

}

const resultList: TTask[] = [];

const keys = ["nombre_cliente", "edad", "ci", "altura"];

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    ci: "123123",
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE - Otra instancia",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    altura: "170cm"
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    ci: "111111",
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    altura: "155cm"
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    ci: "333333",
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    altura: "170cm"
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    ci: "555555",
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    altura: "163cm"
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    ci: "777777",
  }
});

resultList.push({
  nombreTarea: "MOSTRAR_CLIENTE",
  tarea: {
    nombre_cliente: "Maria",
    edad: 50,
    altura: "175cm"
  }
});

const App = () => {
  return (
    <div>
      {<TasksTables keys={keys} resultList={resultList}></TasksTables>}
    </div>
  );
}

export default App;