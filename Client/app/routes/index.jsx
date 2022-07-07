import { ClientOnly } from "remix-utils";
import Favorites from "../components/Favorites.client";

export default function Index() {
  
  return (
    <div>
      <h1>Dashboard</h1>
      <ClientOnly>
        {Favorites}
      </ClientOnly>
    </div>
  );
}
