// @ts-nocheck
import { SharedListComponent } from "../../components/SharedListComponent";

export default function Home() {
  return <SharedListComponent filterFn={(item) => item.status === false} />;
}
