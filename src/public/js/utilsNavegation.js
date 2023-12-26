function navigateToUrl(checkbox, otherCheckboxId) {
  document.getElementById(otherCheckboxId).checked = false;
  let route = window.location.origin + window.location.pathname;
  var params = new URLSearchParams(window.location.search);
  if (checkbox.checked) {
    if (window.location.search) {
      params.delete("status");
      params.append("status", checkbox.value);
      route += "?" + params.toString();
    } else {
      route += "?status=" + checkbox.value;
    }
    window.location.href = route;
  } else {
    params.delete("status");
    if (params.toString() === "") {
      window.location.href = window.location.origin + window.location.pathname;
    } else {
      let newRoute =
        window.location.origin +
        window.location.pathname +
        "?" +
        params.toString();
      window.location.href = newRoute;
    }
  }
}
