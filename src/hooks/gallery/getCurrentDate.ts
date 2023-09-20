function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear().toString();

  const month = date.getMonth() + 1;
  month = month < 10 ? '0' + month.toString() : month.toString();

  const day = date.getDate();
  day = day < 10 ? '0' + day.toString() : day.toString();

  const hour = date.getHours();
  hour = hour < 10 ? '0' + hour.toString() : hour.toString();

  const minites = date.getMinutes();
  minites = minites < 10 ? '0' + minites.toString() : minites.toString();

  const seconds = date.getSeconds();
  seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString();

  // return year + month + day + hour + minites + seconds;
  return year + '-' + month + '-' + day + '/' + hour + ':' + minites;
}
