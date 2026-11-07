import { ModuleView } from "@/components/module-view";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  return <ModuleView module={module} />;
}
