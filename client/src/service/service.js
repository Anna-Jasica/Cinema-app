export async function getReservations() {
  const response = await fetch("http://localhost:3001/getReservations");
  return response.json();
  // .then(data => data.json())
  // .then(res => {
  //   this.setState({ reservations: res.data });
  //   console.log(res.data);
  // });
}
