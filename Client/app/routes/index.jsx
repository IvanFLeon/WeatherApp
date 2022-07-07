import { ClientOnly } from "remix-utils";
import Favorites from "../components/Favorites.client";

export default function Index() {
  
  return (
    <div>
      <ClientOnly>
        {Favorites}
      </ClientOnly>
    </div>
  );
}
