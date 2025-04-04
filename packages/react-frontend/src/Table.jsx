import React from "react";

function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
  }

function TableBody(props) {
    const rows = props.characterData.map((row, rowIndex) => {
        return (
            <tr key={rowIndex}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button onClick={() => props.removeCharacter(rowIndex)}>
                        Delete
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <tbody>
            {rows}
        </tbody>
    );
  }


function Table(props) {
    return (
        <table>
        <TableHeader />
        <TableBody 
            characterData={props.characterData}
            removeCharacter={props.removeCharacter}
        />
        </table>
    );
}

export default Table;