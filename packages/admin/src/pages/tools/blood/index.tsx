import React from 'react';

function Blood() {
  return (
    <div>
      <h2>血型遗传规律表</h2>
      <table width="100%" cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <th style={{width: '33%'}}>父母血型</th>
            <th style={{width: '33%'}}>子女会出现的血型</th>
            <th style={{width: '33%'}}>子女不会出现的血型</th>
          </tr>
          <tr>
            <td>O+O</td>
            <td>O</td>
            <td>A、B、AB</td>
          </tr>
          <tr>
            <td>O+A</td>
            <td>A、O</td>
            <td>B、AB</td>
          </tr>
          <tr>
            <td>O+B</td>
            <td>B、O</td>
            <td>A、AB</td>
          </tr>
          <tr>
            <td>O+AB</td>
            <td>A、B</td>
            <td>O、AB</td>
          </tr>
          <tr>
            <td>A+A</td>
            <td>A、O</td>
            <td>AB、B</td>
          </tr>
          <tr>
            <td>A+B</td>
            <td>AB、A、B、O</td>
            <td></td>
          </tr>
          <tr>
            <td>A+AB</td>
            <td>A、B、AB</td>
            <td>O</td>
          </tr>
          <tr>
            <td>B+B</td>
            <td>B、O</td>
            <td>A、AB</td>
          </tr>
          <tr>
            <td>B+AB</td>
            <td>A、B、AB</td>
            <td>O</td>
          </tr>
          <tr>
            <td>AB+AB</td>
            <td>A、B、AB</td>
            <td>O</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Blood;
