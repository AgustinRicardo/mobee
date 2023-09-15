import ListDetails from "@/components/ListDetails";
import { getUser } from "@/lib/functions";

export default async function ListDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser();

  return (
    <ListDetails url={`/api/list?listId=${params.id}`} userId={user?.id!} />
  );
}
