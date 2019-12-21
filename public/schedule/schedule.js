// new Date({{ epoch }} * 1000).toLocaleDateString(undefined, {timeZone: 'GMT'})

function makeTable(tableId, calendar) {
  var tbody = document.createElement('tbody');
  var tableElem = document.getElementById(tableId);
  var cell, row;

  var thead = tableElem.getElementsByTagName('thead')[0];

  try {
    //data rows
    for (var event_i in calendar) {
      try {
        row = document.createElement('tr');
        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(calendar[event_i].title));
        row.appendChild(cell);
        cell = document.createElement('td');
        cell.appendChild(document.createTextNode(calendar[event_i].dateString));
        row.appendChild(cell);
        tbody.appendChild(row);
      } catch (err) {
        continue;
      }
    }
  } catch (err) {
    row = document.createElement('tr');
    cell = document.createElement('td');
    cell.appendChild(document.createTextNode('The table was unable to load.'));
    var frown = document.createElement('CODE');
    frown.appendChild(document.createTextNode(':('));
    cell.appendChild(frown);
    row.appendChild(cell);
    tbody.appendChild(row);
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
