import { ClientsMap } from "@/components/clients-map";
import { CLIENT_LOCATIONS } from "@/constants/data";

export default function Home() {
  return <ClientsMap locations={CLIENT_LOCATIONS} />;
}
