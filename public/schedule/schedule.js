// new Date({{ epoch }} * 1000).toLocaleDateString(undefined, {timeZone: 'GMT'})

function makeTable(tableId, calendar) {
  var tbody = document.createElement('tbody');
  var tableElem = document.getElementById(tableId);
  var cell, row;

  var thead = tableElem.getElementsByTagName('thead')[0];

  //data rows
  for (var event of calendar) {
    try {
      row = document.createElement('tr');
      cell = document.createElement('td');
      cell.appendChild(document.createTextNode(event.title));
      row.appendChild(cell);
      cell = document.createElement('td');
      cell.appendChild(document.createTextNode(event.dateString));
      row.appendChild(cell);
      tbody.appendChild(row);
    } catch (err) {
      continue;
    }
  }

  //append to table
  while (tableElem.lastChild) {
    tableElem.removeChild(tableElem.lastChild);
  }
  if (thead) {
    tableElem.appendChild(thead);
  }
  tableElem.appendChild(tbody);
}

{
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    makeTable('schedule-table', JSON.parse(this.responseText));
  };
  xhr.open('GET', '../js/events.json');
  xhr.send();
}
