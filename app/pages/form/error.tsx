import MainStyledDiv from "../../components/MainStyledDiv"

export default function error() {
  return (
    <MainStyledDiv>
      <h1>Oops... something has gone wrong.</h1>
      <p>Try hitting the back button or returning <a href="/home">home</a></p>
    </MainStyledDiv>
  )
}
