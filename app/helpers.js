function getLiteralDay(day) {
  const thisDay = day;
  let literalDay;

  if (thisDay === 'do') {
    literalDay = 'Donnerstag';
  } else if (thisDay === 'fr') {
    literalDay = 'Freitag';
  } else {
    literalDay = 'Samstag';
  }
  return literalDay;
}

function getDay() {
  const date = new Date();
  const day = date.getDay();

  if (day === 5) {
    return 'fr';
  } else if (day === 6) {
    return 'sa';
  } else {
    return 'do';
  }
}

export { getLiteralDay, getDay };
