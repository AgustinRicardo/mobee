import { getUser } from "@/lib/functions";
import FilmsPageContent from "@/components/FilmsPageContent";

export default async function FilmsPage() {
  const user = await getUser();

  return user && <FilmsPageContent user={user} />;
}
