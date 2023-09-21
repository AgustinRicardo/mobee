import ListDetailsContent from "@/components/ListDetailsContent";
import { getUser } from "@/lib/functions";

export default async function ListDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser();

  return <>{user && <ListDetailsContent listId={params.id} user={user} />}</>;
}
