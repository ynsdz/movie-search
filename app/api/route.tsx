import Link from "next/link";
import MovieCard from "../components/movie-card";

async function getServerSideProps() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const res = await fetch(
    "http://www.omdbapi.com/?s=avenger&apikey=bfb2b55a&page=1&y=true"
  );
  const data = await res.json();

  // The next line will only be logged on the server and never on the browser console even if we make
  // client-side navigation.
  // This confirms that `getServerSideProps` is guaranteed to run on the server and never on the client (or browser).
  console.log("test", data[0]);

  return {
    props: {
      data,
    },
  };
}

export default async function ApiTest() {
  const data = await getServerSideProps().then();
  console.log("datanin icerisndeki", data.props.data.Search);
}
